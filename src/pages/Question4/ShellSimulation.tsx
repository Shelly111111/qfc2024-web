import {PageContainer} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Button, Card, Col, Input, List, message, Modal, Row, Typography, Upload} from "antd";
import {CloudUploadOutlined, CodeOutlined, FileSearchOutlined, InboxOutlined} from "@ant-design/icons";
import {getFiles, shellExecute, uploadFile} from "@/services/ant-design-pro/api";

const ShellSimulation = () => {

  const {Dragger} = Upload;
  const {TextArea} = Input;
  const {Paragraph} = Typography;

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [text, setText] = useState("");
  const [cmd, setCmd] = useState("")
  const [data, setData] = useState([])

  const onChange = (info) => {
    const {status, response} = info.file;
    if (status === 'done') {
      if (+response.code === 200) {
        message.success(response.message)
        getFileList()
      } else {
        message.error(response.message)
      }
    } else if (status === 'error') {
      message.error(response?.message || "文件上传失败，请检查文件大小（超过50MB）或联系管理员！")
    }
  }

  const beforeUpload = (file) => {
    if (file.type !== "text/plain" && !file.name.endsWith(".log") && !file.name.endsWith(".java")) {
      message.error("只能上传文本文件、log日志文件或Java脚本文件！")
      return false;
    }
    if (file.size / 1024 / 1024 > 50) {
      message.error("文件大小不能超过50MB！")
      return false;
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //获取文件列表
  const getFileList = async () => {
    const msg = await getFiles();
    if (+msg?.code === 200) {
      setData(msg.data)
    } else {
      message.error(msg?.message || "获取文件列表失败！")
    }
  }

  //执行shell
  const shellExe = async () => {
    if (cmd.trim().length === 0) {
      message.error("请输入shell命令！")
      return;
    }

    const msg = await shellExecute(cmd)
    if (+msg?.code === 200) {
      setText(msg.data.join('\n'))
    } else {
      message.error(msg?.message || "执行命令失败！")
    }
  }


  return (
    <PageContainer>
      <div>
        <p>请使用 Java 语言实现一个基本的 shell 模拟器。</p>
        <br/>
        <p>linux 下有很多对文本进行操作的命令，比如 cat filename 可以将文件的所有内容输出到控制台上。grep keyword filename 可以将文件内容中包含 keyword
          的行内容输出到控制台上。wc -l filename 可以统计 filename 文件中的行数。</p>
        <p>|是代表管道的意思，管道左边命令的结果作为管道右边命令的输入，比如 cat filename | grep exception | wc -l，可以用来统计一个文件中 exception 出现的行数。</p>
        <p>请实现一个功能，可以解析一个 linux 命令（只包含上面三个命令和上面提到的参数以及和管道一起完成的组合，其它情况不考虑），并将结果输出到控制台上，比如下面这几个例子：</p>
        <br/>
        <p>cat xx.txt</p>
        <p>cat xx.txt | grep xml</p>
        <p>wc -l xx.txt</p>
        <p>cat xx.txt | grep xml | wc -l</p>
        <br/>
        <p>请注意程序对于未来加入其他命令的可扩展性和对于大规模输入的内存开销。(注意：当数据过大，将只显示前10行)</p>
      </div>
      <Modal title="上传文件" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Dragger
          name="file"
          multiple={false}
          accept="text/plain,.java,.log"
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
      <Row>
        <Card
          style={{
            width: "50%",
          }}
          title={"获取文件列表"}
          extra={<Button type={"link"} icon={<FileSearchOutlined/>} onClick={getFileList}>获取文件列表</Button>}
          actions={[
            <Row key="upload" style={{width: "100%", height: "100%"}} onClick={showModal} justify="center">
              <Col><CloudUploadOutlined/></Col>
              <Col>上传文件</Col>
            </Row>
          ]}
        >
          <div
            style={{
              height: 300,
              overflow: 'auto',

            }}
          >
            <List
              dataSource={data}
              renderItem={(item) => <List.Item><Paragraph copyable>{item}</Paragraph></List.Item>}
            >
            </List>
          </div>
        </Card>
        <Card
          style={{
            width: "50%",
          }}
          title={<Input placeholder="请输入 shell 命令" onChange={(event) => {
            setCmd(event.target.value)
          }}/>}
          actions={[
            <Row key="shell" style={{width: "100%", height: "100%"}} onClick={shellExe} justify="center">
              <Col><CodeOutlined/></Col>
              <Col>执行</Col>
            </Row>
          ]}
        >
          <TextArea disabled
                    value={text}
                    style={{backgroundColor: "white", resize: 'none', color: 'black', height: 300}}
          />

        </Card>
      </Row>
    </PageContainer>
  )
}

export default ShellSimulation;
