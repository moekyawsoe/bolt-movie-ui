import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Select, Breadcrumb, Badge } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, SaveOutlined, ClearOutlined } from '@ant-design/icons';
import demoData from './demo';

const { Option } = Select;

const App = () => {
  const [channels, setChannels] = useState(demoData);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [filteredChannels, setFilteredChannels] = useState(channels);
  const [formValid, setFormValid] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  useEffect(() => {
    form.validateFields().then(
      () => setFormValid(true),
      () => setFormValid(false)
    );
  }, [form]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search title"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.title.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Overview',
      dataIndex: 'overview',
      key: 'overview',
    },
    {
      title: 'Stream Path',
      dataIndex: 'streamPath',
      key: 'streamPath',
    },
    {
      title: 'Logo Path',
      dataIndex: 'logoPath',
      key: 'logoPath',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge status={status === 'active' ? 'success' : 'error'} text={status} />
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)}>Delete</Button>
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    form.validateFields().then(values => {
      if (editingKey) {
        const updatedChannels = channels.map(channel =>
          channel.key === editingKey ? { ...channel, ...values } : channel
        );
        setChannels(updatedChannels);
        setEditingKey(null);
      } else {
        const newChannel = { ...values, key: channels.length + 1, createdAt: new Date() };
        setChannels([...channels, newChannel]);
      }
      form.resetFields();
    });
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const handleDelete = (key) => {
    setChannels(channels.filter(channel => channel.key !== key));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const performSearch = () => {
    if (searchText.trim() === '') {
      setFilteredChannels(channels);
    } else {
      const filtered = channels.filter(channel =>
        channel.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredChannels(filtered);
    }
  };

  return (
    <div className="p-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>TV Channels</Breadcrumb.Item>
      </Breadcrumb>
      <Form form={form} layout="vertical" onFinish={handleAdd} className="mb-4">
        <div className="flex flex-wrap -mx-2">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]} className="w-full md:w-1/4 px-2">
            <Input />
          </Form.Item>
          <Form.Item name="streamPath" label="Stream Path" rules={[{ required: true, message: 'Please input the stream path!' }]} className="w-full md:w-1/4 px-2">
            <Input />
          </Form.Item>
          <Form.Item name="logoPath" label="Logo Path" rules={[{ required: true, message: 'Please input the logo path!' }]} className="w-full md:w-1/4 px-2">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]} className="w-full md:w-1/4 px-2">
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the category!' }]} className="w-full md:w-1/4 px-2">
            <Select>
              <Option value="movies">Movies</Option>
              <Option value="sports">Sports</Option>
              <Option value="news">News</Option>
              <Option value="kids">Kids</Option>
            </Select>
          </Form.Item>
          <Form.Item name="group" label="Group" rules={[{ required: true, message: 'Please select the group!' }]} className="w-full md:w-1/4 px-2">
            <Select>
              <Option value="group1">Group 1</Option>
              <Option value="group2">Group 2</Option>
              <Option value="group3">Group 3</Option>
            </Select>
          </Form.Item>
          <Form.Item name="overview" label="Overview" className="w-full px-2">
            <Input.TextArea />
          </Form.Item>
        </div>
        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" className="mr-2" icon={<SaveOutlined />}>
            {editingKey ? 'Update' : 'Create'}
          </Button>
          <Button type="default" onClick={() => form.resetFields()} icon={<ClearOutlined />}>
            Clear
          </Button>
        </Form.Item>
      </Form>
      <div className="flex items-center mb-4">
        <Input
          placeholder="Search by title"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 200 }}
          className="mr-2"
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={performSearch} />
      </div>
      <Table
        dataSource={filteredChannels}
        columns={columns}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        className="rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default App;
