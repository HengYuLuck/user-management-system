import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Alert, Spin, Typography } from 'antd';
import { 
  UserOutlined, 
  UsergroupAddOutlined, 
  LoginOutlined,
  DashboardOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import { DashboardStats, User } from '../../types';
import styles from './Dashboard.module.css';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const { user } = useAuth();

  // 获取仪表板数据
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [dashboardStats, usersResponse] = await Promise.all([
          apiService.getDashboardStats(),
          apiService.getUsers({ page: 0, size: 5, sort: 'createdAt,desc' })
        ]);
        
        setStats(dashboardStats);
        setRecentUsers(usersResponse.content);
      } catch (err: any) {
        setError(err.message || '数据加载失败');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 饼图颜色配置
  const roleColors = ['#1890ff', '#52c41a', '#faad14', '#ff4d4f'];
  const statusColors = ['#52c41a', '#faad14', '#ff4d4f', '#d9d9d9'];

  // 最近用户表格列配置
  const userColumns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '姓名',
      key: 'fullName',
      render: (record: User) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const roleMap: Record<string, string> = {
          'ADMIN': '管理员',
          'MANAGER': '经理',
          'USER': '用户',
        };
        return roleMap[role] || role;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          'ACTIVE': { text: '活跃', color: '#52c41a' },
          'INACTIVE': { text: '未激活', color: '#faad14' },
          'LOCKED': { text: '已锁定', color: '#ff4d4f' },
          'PENDING': { text: '待审核', color: '#d9d9d9' },
        };
        const statusInfo = statusMap[status] || { text: status, color: '#d9d9d9' };
        return <Text style={{ color: statusInfo.color }}>{statusInfo.text}</Text>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('zh-CN'),
    },
  ];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="数据加载错误"
        description={error}
        type="error"
        showIcon
        className={styles.errorAlert}
      />
    );
  }

  return (
    <div className={styles.dashboard}>
      <Title level={2} className={styles.pageTitle}>
        <DashboardOutlined className={styles.titleIcon} />
        仪表板
      </Title>
      
      <Text className={styles.welcomeText}>
        欢迎回来，{user?.firstName || user?.username}！
      </Text>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className={styles.statsCards}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="总用户数"
              value={stats?.totalUsers || 0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="活跃用户"
              value={stats?.activeUsers || 0}
              prefix={<UsergroupAddOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="今日新增"
              value={stats?.newUsersToday || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="总登录次数"
              value={stats?.totalLogins || 0}
              prefix={<LoginOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} className={styles.charts}>
        {/* 登录趋势图 */}
        <Col xs={24} lg={16}>
          <Card 
            title="登录趋势" 
            extra={<Text type="secondary">最近7天</Text>}
            className={styles.chartCard}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.loginTrends || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#1890ff" 
                  name="登录次数"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* 用户角色分布 */}
        <Col xs={24} lg={8}>
          <Card 
            title="用户角色分布" 
            className={styles.chartCard}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats?.usersByRole || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => 
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(stats?.usersByRole || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={roleColors[index % roleColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* 最近添加的用户 */}
      <Card 
        title="最近添加的用户" 
        className={styles.recentUsersCard}
      >
        <Table
          columns={userColumns}
          dataSource={recentUsers}
          rowKey="id"
          pagination={false}
          className={styles.userTable}
        />
      </Card>
    </div>
  );
};

export default Dashboard; 