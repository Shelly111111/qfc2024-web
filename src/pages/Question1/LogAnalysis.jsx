import {PageContainer} from '@ant-design/pro-components';
import React from 'react';
import { Upload } from "antd";

const LogAnalysis = () => {

  return (
    <PageContainer>
      <div>
        <p>从本题对应的附件中找到 access.log 文件，并编程根据文件内容统计以下数据：</p>
        <p>1. 请求总量；</p>
        <p>2. 请求最频繁的 10 个 HTTP 接口，及其相应的请求数量；</p>
        <p>3. POST 和 GET 请求量分别为多少；</p>
        <p>4. URI 格式均为 /AAA/BBB 或者 /AAA/BBB/CCC 格式，按 AAA 分类，输出各个类别 下 URI 都有哪些。</p>
        <p>本题推荐使用 Java 语言和 Guava 库。</p>
      </div>
      <div>
        <Upload
          accept={".log,.txt"}

        />
      </div>
    </PageContainer>
  );
};

export default LogAnalysis;
