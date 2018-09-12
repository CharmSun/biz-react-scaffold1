import { Layout, Breadcrumb } from 'antd';
import { Route, Link, Switch } from 'react-router-dom';
import routes from '../../routes/config';
import SiderMenu from './SiderMenu';

import './style.less';

const {Header, Content, Footer} = Layout;

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <div className="header-title">
            品牌样式中心
          </div>
        </Header>
        <Layout>
          <SiderMenu />
          <Layout>
            <Content style={{minHeight: 780}}>
              <Switch>
                {
                  routes.map((route, index) => (
                    <Route key={index} {...route} />
                  ))
                }
              </Switch>
            </Content>
            <Footer className="footer">Copyright © {(new Date()).getFullYear()} Sogou BizFE</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
