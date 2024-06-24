import {PageContainer} from '@ant-design/pro-components';
import React, {useState, useEffect} from 'react';
import {CloudUploadOutlined, CodeOutlined, InboxOutlined} from '@ant-design/icons';
import {message, Upload, Card, Modal, Descriptions, Row, Col} from 'antd';
import {analysisFile, login, uploadFile} from "@/services/ant-design-pro/api";

const {Dragger} = Upload;

const LogAnalysis = () => {

  const [file, setFile] = useState("null")
  const [totalQueryCount, setTotalQueryCount] = useState("-1")
  const [getQueryCount, setGetQueryCount] = useState("-1")
  const [postQueryCount, setPostQueryCount] = useState("-1")
  const [frequentInterface, setFrequentInterface] = useState("[]")
  const [groupedURL, setGroupedURL] = useState("[]")
  const [isModalOpen, setIsModalOpen] = useState(false)


  const items = [
    {
      key: '1',
      label: '请求总量',
      children: totalQueryCount,
    },
    {
      key: '2',
      label: 'GET请求总量',
      children: getQueryCount,
    },
    {
      key: '3',
      label: 'POST请求总量',
      children: postQueryCount,
    },
    {
      key: '4',
      label: '请求最频繁的10个接口',
      children: (<Descriptions items={JSON.parse(frequentInterface)} column={2}/>),
      span: 3,
    },
    {
      key: '4',
      label: 'URI分类',
      children: (<Descriptions items={JSON.parse(groupedURL)} column={1}/>),
      span: 3,
    }
  ]


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (info) => {
    const {status, response} = info.file;
    if (status === 'done') {
      if (+response.code === 200) {
        setFile(info.file.name)
        message.success(response.message)
      } else {
        message.error(response.message)
      }
    } else if (status === 'error') {
      message.error(response?.message || "文件太大（超过50MB），无法上传！")
    }
  }

  const beforeUpload = (file, fileList) => {
    if (file.type !== "text/plain" && !file.name.endsWith(".log")) {
      message.error("只能上传文本文件或log日志文件！")
      return false;
    }
    if (file.size / 1024 / 1024 > 50) {
      message.error("文件大小不能超过50MB！")
      return false;
    }
  }

  //分析日志
  const analysis = async () => {
    const msg = await analysisFile(file);
    if (+msg.code === 200) {
      let data = msg.data
      //设置请求总量
      setTotalQueryCount(data.queryCount)
      setFrequentInterface(JSON.stringify(data.frequentInterface))
      setGetQueryCount(data.getCount)
      setPostQueryCount(data.postCount)
      setGroupedURL(JSON.stringify(data.groupedURL))
    } else {
      message.error(msg.message)
    }
  }


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
        <Modal title="Upload Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Dragger
            name="file"
            multiple={false}
            accept="text/plain, .log"
            customRequest={uploadFile}
            onChange={onChange}
            beforeUpload={beforeUpload}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger>
        </Modal>
        <Card
          hoverable
          style={{
            width: "100%",
          }}
          title={file}
          actions={[
            <Row key="upload" style={{width: "100%", height: "100%"}} onClick={showModal} justify="center">
              <Col><CloudUploadOutlined/></Col>
              <Col>上传文件</Col>
            </Row>,
            <Row key="analysis" style={{width: "100%", height: "100%"}} onClick={analysis} justify="center">
              <Col><CodeOutlined/></Col>
              <Col>分析日志</Col>
            </Row>,
          ]}
        >
          <Descriptions layout={"vertical"} bordered items={items}>

          </Descriptions>
        </Card>
      </div>
    </PageContainer>
  );
};

export default LogAnalysis;
