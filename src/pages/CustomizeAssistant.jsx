import React, { useState } from "react";
import { Form } from "antd";
import { useLocation } from "react-router-dom";
import Btn from "../components/uiComponents/Btn";
import CenteredCard from "../components/uiComponents/centeredCard";
import CustomInput from "../components/uiComponents/InputField";
import { getAddToSlackUrl } from "../api/slack";

function CustomizeAssistant() {

  const location = useLocation();
  const assistantType = location.state
  const [apiLoading, setApiLoading] = useState(false);
  const [form] = Form.useForm();
  const handleContinue = async (values) => {
    try {
      const res = await getAddToSlackUrl({ name: values.name, type: assistantType })
      window.location.href = `${res.url}`

    } catch (error) {
      console.warn(error)
    }
  };

  return (
    <CenteredCard className="lg:w-[30%] md:w-[40%] w-[90%]">
      <h3 className="text-2xl font-bold mt-4 text-center">
        Customize{" "}
        <span className="bg-gradient-to-r from-[#2DB8D9] to-[#1C1F4A] text-transparent bg-clip-text ">
          {assistantType}
        </span>{" "}
        for your team
      </h3>
      <h3 className="font-bold mt-4 self-start">
        What would you like to call this assistant?
      </h3>
      <p className="text-sm self-start mt-2">
        This is the name that will be used to identify your assistant in the
        chat and Slack
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleContinue}
        className="w-full mt-4"
        initialValues={{
          name: "Sync Smart",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your Name.!",
            },
          ]}
        >
          <CustomInput disabled type="text" placeholder="Recruiter" />
        </Form.Item>
        <h3 className="font-bold mt-10 self-start">
          Customize {assistantType} to your Slack workspace
        </h3>
        <p className="text-xs self-start my-3">
          Once connected, you’ll be able to chat with your Operations directly
          in Slack. Takes just a few seconds.
        </p>

        <Form.Item className="mb-0">
          <Btn
            type="submit"
            color="primary"
            text="Add to Slack"
            isLoading={apiLoading}
            showIcon={true}
          />
        </Form.Item>
      </Form>
    </CenteredCard>
  );
}

export default CustomizeAssistant;
