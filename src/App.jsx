import React, { useState } from 'react';
    import { Table, Button, Form, Input, Select, Breadcrumb } from 'antd';

    const { Option } = Select;

    const demoData = [
      {
        key: '1',
        title: 'Channel 1',
        overview: 'Overview of Channel 1',
        streamPath: '/stream/1',
        logoPath: '/logo/1',
        status: 'active',
        category: 'movies',
        group: 'group1',
        createdAt: new Date(),
      },
      {
        key: '2',
        title: 'Channel 2',
        overview: 'Overview of Channel 2',
        streamPath: '/stream/2',
        logoPath: '/logo/2',
        status: 'inactive',
        category: 'sports',
        group: 'group2',
        createdAt: new Date(),
      },
      {
        key: '3',
        title: 'Channel 3',
        overview: 'Overview of Channel 3',
        streamPath: '/stream/3',
        logoPath: '/logo/3',
        status: 'active',
        category: 'news',
        group: 'group3',
        createdAt: new Date(),
      },
      // Add more demo data as needed
    ];

    const App = () => {
      const [channels, setChannels] = useState(demoData);
      const [form] = Form.useForm();
      const [searchText, setSearchText] = useState('');

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
              <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
              <Button type="link" danger onClick={() => handleDelete(record.key)}>Delete</Button>
            </span>
          ),
        },
      ];

      const handleAdd = () => {
        form.validateFields().then(values => {
          const newChannel = { ...values, key: channels.length + 1, createdAt: new Date() };
          setChannels([...channels, newChannel]);
          form.resetFields();
        });
      };

      const handleEdit = (record) => {
        form.setFieldsValue(record);
      };

      const handleDelete = (key) => {
        setChannels(channels.filter(channel => channel.key !== key));
      };

      const handleSearch = (e) => {
        setSearchText(e.target.value);
      };

      const filteredChannels = channels.filter(channel =>
        channel.title.toLowerCase().includes(searchText.toLowerCase())
      );

      return (
        <div className="p-4">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>TV Channels</Breadcrumb.Item>
          </Breadcrumb>
          <Form form={form} layout="vertical" onFinish={handleAdd} className="mb-4">
            <div className="flex flex-wrap -mx-2">
              <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]} className="w-full md:w-1/2 px-2">
                <Input />
              </Form.Item>
              <Form.Item name="overview" label="Overview" className="w-full md:w-1/2 px-2">
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="streamPath" label="Stream Path" rules={[{ required: true, message: 'Please input the stream path!' }]} className="w-full md:w-1/2 px-2">
                <Input />
              </Form.Item>
              <Form.Item name="logoPath" label="Logo Path" rules={[{ required: true, message: 'Please input the logo path!' }]} className="w-full md:w-1/2 px-2">
                <Input />
              </Form.Item>
              <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]} className="w-full md:w-1/2 px-2">
                <Select>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
              <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the category!' }]} className="w-full md:w-1/2 px-2">
                <Select>
                  <Option value="movies">Movies</Option>
                  <Option value="sports">Sports</Option>
                  <Option value="news">News</Option>
                  <Option value="kids">Kids</Option>
                </Select>
              </Form.Item>
              <Form.Item name="group" label="Group" rules={[{ required: true, message: 'Please select the group!' }]} className="w-full md:w-1/2 px-2">
                <Select>
                  <Option value="group1">Group 1</Option>
                  <Option value="group2">Group 2</Option>
                  <Option value="group3">Group 3</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">Add Channel</Button>
            </Form.Item>
          </Form>
          <Input
            placeholder="Search by title"
            value={searchText}
            onChange={handleSearch}
            className="mb-4"
          />
          <Table
            dataSource={filteredChannels}
            columns={columns}
            rowKey="key"
            pagination={{ pageSize: 5 }}
            className="shadow-md rounded-lg overflow-hidden"
          />
        </div>
      );
    };

    export default App;
