import React, { Suspense, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import api from "../../../data/axiosConfig";
import ReactQuill from 'react-quill';
import {Button, Input, Col,Row,Form,notification} from "antd"
import { Await, Navigate, defer, useLoaderData } from 'react-router-dom';
import Spinner from '../../../components/ui/Spinner/Spinner';
import ReactTextArea from '../../institution/instPostForm/components/ReactTextArea';
import "./AddNews.scss"
import { getNews } from '../../../util/api';
import ProfileImage from '../../../components/ui/ProfileImage/ProfileImage';
import InputFile from '../../../components/form/InputFile';
import FormInput from '../../../components/form/FormInput';

const AddNews = () => {
  
    const newsLoader = useLoaderData();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [newsContent,setNewsContent] = useState({
      content: ""
    })

    const isSubmitDisabled =
    newsContent?.content?.replace(/<(.|\n)*?>/g, "").trim().length === 0;


    const handleInputChange = (name, value) => {
       setNewsContent((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }



    const onFinish = async (values) => {
      //api code
      let formData = new FormData();
      formData.append("newsLogo",values.newsLogo?.file)
      formData.append("title",values.title)
      formData.append("content",newsContent.content)
      try {
        await api().post(`api/news`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
        );
        notification.success({ message: "تمت إضافة الخبر  بنجاح" });
        setLoading(false);
      } catch (error) {
        console.log(error);
        notification.error({ message: "فشل تحديث البيانات" });
      }
    };

  return (
    <Suspense fallback={<Spinner/>}>
      <Await 
      errorElement={<p>Error loading add-news page.</p>}
      >
        {(loadedNews) => (

<div className='addNewsContainer'>
      <div className='addNewsTitle'>
        <span><strong>اضافة خبر</strong></span>
      </div>

      <div className='addNewsFormContainer'>
         <Form
         form={form}
         onFinish={onFinish}
         >
        <Col>
        <InputFile name="newsLogo" label="اضافة صورة" accept="image/*" />
        </Col>
         <Col>
         {/* <Form.Item
         name="title"
         rules={[
          {required: true, message: "يرجى ادخال عنوان الخبر"},
         ]}
         >
          <Input placeholder='عنوان الخبر'/>
         </Form.Item> */}

         <FormInput label="عنوان الخبر" placeholder="اضف عنوان الخبر" name="title"/>
         </Col>
         <Col style={{textAlign: "left"}}>
          <ReactTextArea
          name="content"
          formdata={newsContent.content}
          handleInputChange={handleInputChange}
          />
         </Col>
         <div className="addNewsButton">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="add-button"
                    disabled={isSubmitDisabled}
                    loading={loading}
                  >
                    {loading ? "جاري الإضافة..." : "اضافة"}
                  </Button>
                </div>
         </Form>
      </div>
    </div>
    
        )}
    </Await>
    </Suspense>
  )
}

export default AddNews

export const addNewsDataLoader = ({ params }) => {
  const newsId = params.id;
  return defer({ news: getNews(newsId) });
};
