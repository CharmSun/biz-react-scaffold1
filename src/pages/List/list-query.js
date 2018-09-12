import {Form, Button, Select, Input} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAllChannelList, fetchAllProductList, fetchStyleConfList} from '../../actions/style-config';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(
  state => {
    return state.styleConfig.toJS()
  },
  dispatch => bindActionCreators({
    fetchStyleConfList,
    fetchAllChannelList,
    fetchAllProductList,
  }, dispatch)
)
@Form.create()
export default class extends React.Component {
  componentDidMount() {
    this.props.fetchAllChannelList();
    this.props.fetchAllProductList();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const args = this.props.form.getFieldsValue();
    this.props.fetchStyleConfList({
      data: args,
      pageNo: 1
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const {channelList, productList, form} = this.props;
    const {getFieldDecorator} = form;

    const channelOptions = channelList.map((item, i) => {
      return (<Option key={i} value={item.channelId}>{item.channelName}</Option>);
    });
    const productOptions = productList.map((item, i) => {
      return (<Option key={i} value={item.productId}>{item.productName}</Option>);
    });

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="渠道">
          {getFieldDecorator('channelId', {
            initialValue: ''
          })(
            <Select style={{width: 150}}>
              <Option value="">全部</Option>
              {channelOptions}
            </Select>
          )}
        </FormItem>

        <FormItem label="产品">
          {getFieldDecorator('productId', {
            initialValue: ''
          })(
            <Select style={{width: 150}}>
              <Option value="">全部</Option>
              {productOptions}
            </Select>
          )}
        </FormItem>

        <FormItem label="样式编号">
          {getFieldDecorator('styleNumber', {
            initialValue: ''
          })(
            <Input/>
          )}
        </FormItem>

        <FormItem label="样式名称">
          {getFieldDecorator('styleName', {
            initialValue: ''
          })(
            <Input/>
          )}
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
