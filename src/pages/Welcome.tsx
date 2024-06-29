import {PageContainer} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
import {Card, theme, Typography} from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({title, href, index, desc}) => {
  const {useToken} = theme;

  const {token} = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');
  const {Text} = Typography;
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        styles={{
          body: {
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          },
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            2024届去哪儿旅行后端开发自学计划
          </div>
          <div
            style={{
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            <Text>1、注意编码规范，参考阿里巴巴 Java 手册</Text><br/>
            <Text>2、熟练使用 JDK 和 guava 的 collection、IO、network 等模块</Text><br/>
            <Text>3、了解使用 SpringMVC 或 SpringBoot 框架，并尝试结合 mybatis 使用</Text><br/>
            <Text>4、熟悉 linux 命令和 http 请求原理</Text><br/>
            <Text>5、考虑代码可读性和扩展性</Text><br/>
            <Text>6、思考面向接口编程</Text><br/>
            <Text>7、尝试 guava 和 java8 语法</Text><br/>
            <Text>8、了解 Java 网络编程</Text>

          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://github.com/Shelly111111/QFC2024"
              title="QFC2024"
              desc="该程序为作业版本，使用SpringBoot实现“后端开发自学计划”的五个要求。"
            />
            <InfoCard
              index={2}
              title="QFC2024-web"
              href="https://github.com/Shelly111111/qfc2024-web"
              desc="基于react和ant design开发的web前端展示样例。主要提供：登录/注销、日志分析、代码行数统计、文本解密以及Shell模拟的功能。"
            />
            <InfoCard
              index={3}
              title="QFC2024-backend"
              href="https://github.com/Shelly111111/QFC2024-backend"
              desc="采用DDD架构设计的后端服务，以对应前端展示的功能需求。"
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
