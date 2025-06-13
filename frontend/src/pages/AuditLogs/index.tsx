import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  message,
  Typography,
  Tag,
} from 'antd';
import { SearchOutlined, DownloadOutlined, HistoryOutlined } from '@ant-design/icons';
import type { TablePaginationConfig } from 'antd/es/table';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import apiService from '../../services/api';
import { AuditLog, AuditLogFilter, ACTION_TYPES } from '../../types';
import styles from './AuditLogs.module.css';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const AuditLogs: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<AuditLogFilter>({
    page: 0,
    size: 10,
    sort: 'createdAt,desc',
  });

  const fetchLogs = async (params: AuditLogFilter) => {
    try {
      setLoading(true);
      const response = await apiService.getAuditLogs(params);
      setLogs(response.content);
      setTotal(response.totalElements);
    } catch (error: any) {
      message.error('获取审计日志失败：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(filter);
  }, [filter]);

  const handleSearch = async (values: any) => {
    const { dateRange, ...rest } = values;
    const params: AuditLogFilter = {
      ...filter,
      ...rest,
      page: 0,
      startDate: dateRange?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      endDate: dateRange?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
    };
    setFilter(params);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setFilter({
      ...filter,
      page: (pagination.current || 1) - 1,
      size: pagination.pageSize || 10,
    });
  };

  const handleExport = async () => {
    try {
      const values = await form.validateFields();
      const { dateRange, ...rest } = values;
      const params: AuditLogFilter = {
        ...rest,
        startDate: dateRange?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
        endDate: dateRange?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      };
      
      setLoading(true);
      const blob = await apiService.exportAuditLogs(params);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audit-logs-${dayjs().format('YYYY-MM-DD-HH-mm-ss')}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      message.success('导出成功');
    } catch (error: any) {
      message.error('导出失败：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getActionTypeTag = (type: string) => {
    const colorMap: Record<string, string> = {
      [ACTION_TYPES.LOGIN]: 'green',
      [ACTION_TYPES.LOGOUT]: 'orange',
      [ACTION_TYPES.CREATE_USER]: 'blue',
      [ACTION_TYPES.UPDATE_USER]: 'cyan',
      [ACTION_TYPES.DELETE_USER]: 'red',
      [ACTION_TYPES.CHANGE_PASSWORD]: 'purple',
      [ACTION_TYPES.UPDATE_PROFILE]: 'geekblue',
    };
    return <Tag color={colorMap[type] || 'default'}>{type}</Tag>;
  };

  const columns = [
    {
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '用户',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: '操作类型',
      dataIndex: 'actionType',
      key: 'actionType',
      width: 120,
      render: (text: string) => getActionTypeTag(text),
    },
    {
      title: '详细信息',
      dataIndex: 'actionDetails',
      key: 'actionDetails',
      ellipsis: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 130,
    },
    {
      title: '客户端',
      dataIndex: 'userAgent',
      key: 'userAgent',
      width: 200,
      ellipsis: true,
    },
  ];

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().endOf('day');
  };

  return (
    <div className={styles.auditLogs}>
      <Title level={2} className={styles.pageTitle}>
        <HistoryOutlined className={styles.titleIcon} />
        操作日志
      </Title>

      <Card className={styles.filterCard}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
          className={styles.filterForm}
        >
          <Form.Item name="username" className={styles.formItem}>
            <Input
              placeholder="用户名"
              allowClear
              prefix={<SearchOutlined />}
            />
          </Form.Item>

          <Form.Item name="actionType" className={styles.formItem}>
            <Select
              placeholder="操作类型"
              allowClear
              style={{ width: 150 }}
            >
              {Object.values(ACTION_TYPES).map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="dateRange" className={styles.formItem}>
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              ranges={{
                '今天': [dayjs().startOf('day'), dayjs().endOf('day')],
                '本周': [dayjs().startOf('week'), dayjs().endOf('week')],
                '本月': [dayjs().startOf('month'), dayjs().endOf('month')],
              }}
            />
          </Form.Item>

          <Form.Item className={styles.formItem}>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                查询
              </Button>
              <Button icon={<DownloadOutlined />} onClick={handleExport}>
                导出
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={logs}
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
    </div>
  );
};

export default AuditLogs; 