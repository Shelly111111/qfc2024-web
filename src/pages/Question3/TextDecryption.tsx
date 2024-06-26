import {PageContainer} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Card, Col, Divider, Input, message, Modal, Pagination, Row, Upload, Typography} from "antd";
import {uploadFile} from "@/services/ant-design-pro/api";
import {CloudUploadOutlined, FileTextOutlined, InboxOutlined} from "@ant-design/icons";

const TextDecryption = () => {

  const {Dragger} = Upload;
  const { TextArea } = Input;
  const { Title } = Typography;

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [file, setFile] = useState("请上传文件")

  const [encryptText, setEncryptText] = useState("");
  const [decryptText, setDecryptText] = useState("");
  //当前页
  const [pageNumber, setPageNumber] = useState(1);
  //总页数
  const [totalPage, setTotalPage] = useState(1);

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

  const beforeUpload = (file) => {
    if (file.type !== "text/plain") {
      message.error("只能上传文本文件！")
      return false;
    }
    if (file.size / 1024 / 1024 > 50) {
      message.error("文件大小不能超过50MB！")
      return false;
    }
  }

  const pageChange = (pageNumber) => {
    // console.log('Page: ', pageNumber);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const decrypt = async () => {

  }

  return (
    <PageContainer>
      <div>
        <p>从本题对应的附件中找到 sdxl_prop.txt 和 sdxl_template.txt。根据 sdxl_prop.txt 中内容替换掉 sdxl_template.txt
          里$function(index)形式文字，将其还原成一本完整小说，写到文件 sdxl.txt 中，输出在 classpath 下。</p>
        <p>其中 function 有 4 种类型，替换规则如下：</p>
        <p>1. natureOrder 自然排序，即文本中排列顺序</p>
        <p>2. indexOrder 索引排序，文本中每行第一个数字为索引</p>
        <p>3. charOrder 文本排序，java 的字符排序</p>
        <p>4. charOrderDESC 文本倒序，java 的字符倒序</p>
      </div>
      <div>
        <Modal title="上传文件" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
              请上传文本文件，文件大小不能超过50MB
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
            <Row key="decrypt" style={{width: "100%", height: "100%"}} onClick={decrypt} justify="center">
              <Col><FileTextOutlined/></Col>
              <Col>文本解密</Col>
            </Row>,
          ]}
        >
          <Row style={{display: "flex",justifyContent: "center"}}>
            <Col span={11} >
              <Title level={4} style={{display: "flex",justifyContent: "center"}}>加密后的文本</Title>
              <TextArea disabled
                        value={encryptText}
                        rows={10}
                        style={{backgroundColor: "white", resize: 'none', color:'black'}}
              />
            </Col>
            <Divider type="vertical"/>
            <Col span={11}>
              <Title level={4} style={{display: "flex",justifyContent: "center"}}>解密后的文本</Title>
              <TextArea disabled
                        value={decryptText}
                        rows={10}
                        style={{backgroundColor: "white", resize: 'none', color:'black'}}
              />

            </Col>
          </Row>
          <br/>
          <Pagination showQuickJumper defaultCurrent={pageNumber} total={totalPage} onChange={pageChange} style={{display: "flex",justifyContent: "center"}}/>
        </Card>
      </div>
    </PageContainer>
  );
}

export default TextDecryption;
