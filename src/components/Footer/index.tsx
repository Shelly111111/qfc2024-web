import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'qfc2024-web',
          title: '2024届去哪儿旅行后端开发自学计划-web前端',
          href: 'https://github.com/Shelly111111/qfc2024-web',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Shelly111111',
          blankTarget: true,
        },
        {
          key: 'qfc2024-backend',
          title: '2024届去哪儿旅行后端开发自学计划-web后端',
          href: 'https://github.com/Shelly111111/QFC2024-backend',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
