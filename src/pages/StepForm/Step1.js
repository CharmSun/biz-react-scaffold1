/**
 * @author suncan
 * @date 2018/4/9
 * @description:
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import { getStyleJson, addStyleJson, updateStyleJson } from '../../api/style-config';
import { Input, Button, Divider, Spin, Icon } from 'antd';
import { formatJsonStr } from '../../utils';
const { TextArea } = Input;

@withRouter
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      styleJson: ''
    };
  }

  componentDidMount() {
    const { versionId } = this.props.match.params;
    if(!!versionId){
      this.setState({
        loading: true
      });
      getStyleJson(versionId).then(data => {
        this.setState({
          loading: false,
          styleJson: formatJsonStr(data)
        });
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      styleJson: e.target.value
    });
  };

  nextStep = () => {
    const { styleId, versionId } = this.props.match.params;
    const { history } = this.props;
    if(!!versionId){
      updateStyleJson({
        versionId,
        styleJson: this.state.styleJson
      }).then(data => {
        history.push(`/styleConfig/${versionId}/step2`);
      });
    } else {
      addStyleJson({
        styleId,
        styleJson: this.state.styleJson
      }).then(data => {
        history.push(`/styleConfig/${data}/step2`);
      });
    }

  };

  render() {
    const { loading, styleJson } = this.state;
    return (
      <div style={{marginTop: 24}}>
        <h3>在此输入样式的物料 JSON 数据：</h3>
        <div>
          {loading ?
            <Spin /> :
            <TextArea
              style={{width: '100%', height: '500px'}}
              value={styleJson}
              onChange={this.handleChange}
            />
          }
        </div>
        <div style={{textAlign: 'center',margin:'16px auto'}}>
          <Button type="primary" onClick={this.nextStep}>
            下一步<Icon type="right" />
          </Button>
        </div>
        <Divider />
        <div>
          <h3>说明</h3>
          <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
        </div>
      </div>
    );
  }
}

export default Step1;