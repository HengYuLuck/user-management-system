import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Tag,
  Typography,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  KeyOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { TablePaginationConfig } from 'antd/es/table';
import dayjs from 'dayjs';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import {
  User,
  UserStatus,
  UserRole,
  USER_ROLES,
  CreateUserRequest,
  UpdateUserRequest,
  UserFilter,
} from '../../types';
import styles from './UserManagement.module.css';

const { Title } = Typography;
const { Option } = Select;
const { Password } = Input;

interface UserFormData {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: UserRole;
}

const UserManagement: React.FC = () => {
  const [form] = Form.useForm();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<UserFilter>({
    page: 0,
    size: 10,
    sort: 'createdAt,desc',
  });

  const fetchUsers = async (params: UserFilter) => {
    try {
      setLoading(true);
      const response = await apiService.getUsers(params);
      setUsers(response.content);
      setTotal(response.totalElements);
    } catch (error: any) {
      message.error('获取用户列表失败：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(filter);
  }, [filter]);

  const handleSearch = (values: any) => {
    setFilter({
      ...filter,
      ...values,
      page: 0,
    });
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setFilter({
      ...filter,
      page: (pagination.current || 1) - 1,
      size: pagination.pageSize || 10,
    });
  };

  const handleAdd = () => {
    form.resetFields();
    setEditingUser(null);
    setModalTitle('添加用户');
    setModalVisible(true);
  };

  const handleEdit = (record: User) => {
    form.setFieldsValue({
      username: record.username,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      role: record.role,
    });
    setEditingUser(record);
    setModalTitle('编辑用户');
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiService.deleteUser(id);
      message.success('删除用户成功');
      fetchUsers(filter);
    } catch (error: any) {
      message.error('删除用户失败：' + error.message);
    }
  };

  const handleStatusChange = async (id: number, status: UserStatus) => {
    try {
      await apiService.updateUserStatus(id, status);
      message.success('更新用户状态成功');
      fetchUsers(filter);
    } catch (error: any) {
      message.error('更新用户状态失败：' + error.message);
    }
  };

  const handleResetPassword = async (id: number) => {
    try {
      const newPassword = await apiService.resetUserPassword(id);
      Modal.success({
        title: '重置密码成功',
        content: (
          <div>
            <p>新密码：{newPassword}</p>
            <p>请将此密码安全地传达给用户。</p>
          </div>
        ),
      });
    } catch (error: any) {
      message.error('重置密码失败：' + error.message);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        // 更新用户
        const updateData: UpdateUserRequest = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          role: values.role,
        };
        await apiService.updateUser(editingUser.id, updateData);
        message.success('更新用户成功');
      } else {
        // 创建用户
        const createData: CreateUserRequest = {
          ...values,
          password: values.password || '123456', // 默认密码
        };
        await apiService.createUser(createData);
        message.success('创建用户成功');
      }
      setModalVisible(false);
      fetchUsers(filter);
    } catch (error: any) {
      message.error('操作失败：' + error.message);
    }
  };

  const getStatusTag = (status: UserStatus) => {
    const statusMap: Record<UserStatus, { color: string; text: string }> = {
      [UserStatus.ACTIVE]: { color: 'success', text: '活跃' },
      [UserStatus.INACTIVE]: { color: 'warning', text: '未激活' },
      [UserStatus.LOCKED]: { color: 'error', text: '已锁定' },
      [UserStatus.PENDING]: { color: 'default', text: '待审核' },
    };
    const { color, text } = statusMap[status];
    return <Tag color={color}>{text}</Tag>;
  };

  const getRoleTag = (role: string) => {
    const roleMap: Record<string, { color: string; text: string }> = {
      [USER_ROLES.ADMIN]: { color: 'red', text: '管理员' },
      [USER_ROLES.MANAGER]: { color: 'blue', text: '经理' },
      [USER_ROLES.USER]: { color: 'green', text: '用户' },
    };
    const { color, text } = roleMap[role] || { color: 'default', text: role };
    return <Tag color={color}>{text}</Tag>;
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: '姓名',
      key: 'fullName',
      width: 120,
      render: (record: User) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: (role: string) => getRoleTag(role),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: UserStatus) => getStatusTag(status),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: 180,
      render: (date: string) => date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (record: User) => (
        <Space size="middle">
          <Tooltip title="编辑">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          {record.status === UserStatus.ACTIVE ? (
            <Tooltip title="锁定">
              <Button
                type="link"
                danger
                icon={<LockOutlined />}
                onClick={() => handleStatusChange(record.id, UserStatus.LOCKED)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="解锁">
              <Button
                type="link"
                icon={<UnlockOutlined />}
                onClick={() => handleStatusChange(record.id, UserStatus.ACTIVE)}
              />
            </Tooltip>
          )}
          <Tooltip title="重置密码">
            <Button
              type="link"
              icon={<KeyOutlined />}
              onClick={() => handleResetPassword(record.id)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除此用户吗？"
              onConfirm={() => handleDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.userManagement}>
      <Title level={2} className={styles.pageTitle}>
        <TeamOutlined className={styles.titleIcon} />
        用户管理
      </Title>

      <Card className={styles.filterCard}>
        <Form layout="inline" onFinish={handleSearch} className={styles.filterForm}>
          <Form.Item name="username" className={styles.formItem}>
            <Input placeholder="用户名" allowClear />
          </Form.Item>

          <Form.Item name="role" className={styles.formItem}>
            <Select placeholder="角色" allowClear style={{ width: 120 }}>
              {Object.entries(USER_ROLES).map(([key, value]) => (
                <Option key={key} value={value}>
                  {value}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="status" className={styles.formItem}>
            <Select placeholder="状态" allowClear style={{ width: 120 }}>
              {Object.values(UserStatus).map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className={styles.formItem}>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                添加用户
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{
            total,
            current: filter.page + 1,
            pageSize: filter.size,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ role: USER_ROLES.USER }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
            ]}
          >
            <Input
              disabled={!!editingUser}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            name="firstName"
            label="名"
            rules={[{ required: true, message: '请输入名' }]}
          >
            <Input placeholder="请输入名" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="姓"
            rules={[{ required: true, message: '请输入姓' }]}
          >
            <Input placeholder="请输入姓" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6个字符' },
              ]}
            >
              <Password placeholder="请输入密码" />
            </Form.Item>
          )}

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              {Object.entries(USER_ROLES).map(([key, value]) => (
                <Option key={key} value={value}>
                  {value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement; 