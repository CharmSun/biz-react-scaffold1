import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Breadcrumb, Card, Table, Button, Popconfirm, Icon} from 'antd';
import { fetchStyleConfList, openVersionModal, fetchStyleVersionConfList,
  openStyleModal, openPublishModal } from '../../actions/style-config';
import {pagination} from '../../utils/common';
import ListQuery from './list-query';
import VersionModal from './version-modal';
import StyleModal from './style-modal';
import PublishModal from './publish-modal';
import {deleteStyle} from "../../api/style-config";

@connect(
  state => {
    return {
      styleList: state.styleList.toJS(),
      styleConfig: state.styleConfig.toJS()
    };
  },
  dispatch => bindActionCreators({
    fetchStyleConfList,
    openStyleModal,
    openVersionModal,
    openPublishModal,
    fetchStyleVersionConfList
  }, dispatch)
)

export default class extends React.Component {
  columns = [
    {
      title: '渠道',
      dataIndex: 'channelName'
    },
    {
      title: '样式编号',
      dataIndex: 'styleNumber'
    },
    {
      title: '样式名称',
      dataIndex: 'styleName',
    },
    {
      title: '样式缩略图',
      dataIndex: 'styleImage',
      render: (value, row, index) => {
        return <img src={`/styleConf/getStyleImage.do?path=${value}`} width="100" alt="" />;
      },
    },
    {
      title: '描述',
      dataIndex: 'styleDescription'
    },
    {
      title: '产品',
      dataIndex: 'productStr',
      render: (value, row, index) => {
        return (
          <div className="editable-cell-wrapper">
            <div style={{marginRight:20}}>{value}</div>
            <Icon
              type="edit"
              className="editable-cell-icon"
              onClick={() => {
                this.props.openPublishModal(row.styleId);
              }}
            />
          </div>
        );
      },
    },
    {
      title: '最新版本号',
      dataIndex: 'latestVersionNumber',
    },
    {
      title: '版本状态',
      dataIndex: 'latestVersionStatusStr',
    },
    {
      title: '操作',
      render: (value, row, index) => {
        return (
          <Button.Group>
            <Button onClick={() => {
              this.props.openVersionModal();
              this.props.fetchStyleVersionConfList({
                data: row.styleId,
                pageSize: 10,
                pageNo: 1
              });
            }}>版本</Button>
            <Button onClick={() => {
              this.props.openStyleModal(row.styleId);
            }}>修改</Button>
            <Popconfirm title="确定要删除此样式?" onConfirm={() => {this.confirmDelete(row.styleId)}}>
              <Button>删除</Button>
            </Popconfirm>
          </Button.Group>
        );
      }
    }
  ];

  confirmDelete = (styleId) => {
    deleteStyle(styleId).then(data => {
      this.props.fetchStyleConfList();
    })
  };

  componentDidMount() {
    this.props.fetchStyleConfList();
  }

  pageSizeChange = (current, pageSize) => {
    this.props.fetchStyleConfList({pageSize, pageNo: 1});
  };

  pageNumberChange = (pageNo, pageSize) => {
    this.props.fetchStyleConfList({pageSize, pageNo});
  };

  createStyle = () => {
    this.props.openStyleModal();
  };

  render() {
    const {loading, result, queryArgs} = this.props.styleList;
    const { publishModal } = this.props.styleConfig;
    return (
      <div>
        <div className="page-header">
          <Breadcrumb style={{marginBottom: 16}}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>样式配置</Breadcrumb.Item>
          </Breadcrumb>
          <div className="page-detail">
            <h1 className="page-title">样式列表</h1>
          </div>
        </div>
        <div className="page-content">
          <Card>
            <ListQuery />
            <div style={{margin: '16px 0'}}>
              <Button type="primary" icon="plus" onClick={this.createStyle}>新建样式</Button>
            </div>
            <Table
              rowKey="styleId"
              columns={this.columns}
              dataSource={result.data}
              pagination={{
                ...pagination,
                current: queryArgs.pageNo,
                total: result.totalNumber,
                onShowSizeChange: this.pageSizeChange,
                onChange: this.pageNumberChange,
              }}
              loading={loading}
              bordered
            />
            <VersionModal />
            <StyleModal />
            {publishModal.visible ? <PublishModal /> : null}
          </Card>
        </div>
      </div>
    );
  }
}
