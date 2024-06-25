import {PageContainer} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Card, Col, Descriptions, message, Modal, Row, Upload} from "antd";
import {statisticsCodeLine, uploadFile} from "@/services/ant-design-pro/api";
import {CloudUploadOutlined, CodeOutlined, InboxOutlined} from "@ant-design/icons";

const CodeLines = () => {

  const {Dragger} = Upload;
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [file, setFile] = useState("请上传文件")
  const [codeLines, setCodeLines] = useState("-1")

  const items = [
    {
      key: '1',
      label: '总行数',
      children: -1,
    },
    {
      key: '2',
      label: '代码行数',
      children: codeLines,
    },
    {
      key: '3',
      label: '空白行数',
      children: -1,
    },
    {
      key: '4',
      label: '注释行数',
      children: -1,
    },
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
    if (!file.name.endsWith(".java")) {
      message.error("只能上传java文件！")
      return false;
    }
    if (file.size / 1024 / 1024 > 50) {
      message.error("文件大小不能超过50MB！")
      return false;
    }
  }

  const statistics = async () => {
    if (file === "请上传文件") {
      message.error("请上传文件")
      return;
    }

    //将需要统计的文件名传入后端
    const msg = await statisticsCodeLine(file)
    if (+msg.code === 200) {
      let data = msg.data
      setCodeLines(data.codeLine)
      // console.log(data)
    } else {
      message.error(msg.message)
    }
  }

  return (
    <PageContainer>
      <div>
        <p>从本题对应的附件中找到 StringUtils.java 文件，将其复制到工程的 classpath 下，编程统计附件中的 StringUtils.java 文件的有效代码行数（一个数字）到一个新文件
          validLineCount.txt 中。请注意，</p>
        <p>1. 有效不包括空行、注释；</p>
        <p>2. 考虑代码里有多行注释的情况；</p>
        <p>3. 不用考虑代码和注释混合在一行的情况。</p>
      </div>
      <div>
        <Modal title="Upload Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Dragger
            name="file"
            multiple={false}
            accept=".java"
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
            <Row key="analysis" style={{width: "100%", height: "100%"}} onClick={statistics} justify="center">
              <Col><CodeOutlined/></Col>
              <Col>行数统计</Col>
            </Row>,
          ]}
        >
          <Descriptions layout={"vertical"} bordered items={items} column={2}>

          </Descriptions>
        </Card>
      </div>
    </PageContainer>
  );
}

export default CodeLines;
