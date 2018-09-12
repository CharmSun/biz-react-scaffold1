import {Layout, Menu, Icon} from 'antd';
import { Link } from 'react-router-dom';

const {Sider} = Layout;

//菜单
const menus = [
  { key: '/dashboard', title: '首页', icon: 'mobile' },
  { key: '/list', title: '列表', icon: 'copy' },
  { key: '/form', title: '表单', icon: 'edit' }
];

class SiderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKey: '',
      selectedKey: menus[0].key
    };
  }

  componentWillMount() {
    const { pathname } = this.props.location;
    this.setState({
      selectedKey: pathname
    });
  }

  onClick = (e) => {
    this.setState({
      selectedKey: e.key
    });
  };

  render() {
    return (
      <Sider width={200}>
        <Menu
          style={{height: '100%', backgroundColor: '#fafafa'}}
          mode="inline"
          selectedKeys={[this.state.selectedKey]}
          onClick={this.onClick}
        >
          {menus.map(item => (
            <Menu.Item key={item.key}>
              <Link to={item.key}><Icon type={item.icon} />{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
}

export default SiderMenu;







