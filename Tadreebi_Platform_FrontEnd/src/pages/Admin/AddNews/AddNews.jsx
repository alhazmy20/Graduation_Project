import React, { Suspense, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import api from "../../../data/axiosConfig";
import ReactQuill from 'react-quill';
import {Button, Input, Col,Row,Form,notification} from "antd"
import { Await, Navigate, defer, useLoaderData, useParams } from 'react-router-dom';
import Spinner from '../../../components/ui/Spinner/Spinner';
import ReactTextArea from '../../institution/instPostForm/components/ReactTextArea';
import "./AddNews.scss"
import { getNews } from '../../../util/api';
import InputFile from '../../../components/form/InputFile';
import FormInput from '../../../components/form/FormInput';
import NewsContentArea from './components/NewsContentArea';

const AddNews = () => {
  
    const newsLoader = useLoaderData();
    const { id } = useParams();

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
      
      let PUT = formData
      PUT.append("_method","PUT")

      try {
        if(window.location.pathname === `/admin/add-news`){
          setLoading(true)
          await api().post(`api/news`, formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
          );
          notification.success({ message: "تمت إضافة الخبر  بنجاح" });
          setLoading(false);
        } else if(window.location.pathname === `/admin/manage-news/${id}`){
          setLoading(true)
          await api().post(`api/news/${id}`, PUT,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
          );
          notification.success({ message: "تم تحديث الخبر بنجاح" });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        notification.error({ message: "فشل تحديث البيانات" });
      }
    };

  return (
    <Suspense fallback={<Spinner/>}>
      <Await 
      resolve={newsLoader?.news}
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
         initialValues={loadedNews}
         onFinish={onFinish}
         >
        <Col>
        <InputFile fileName={loadedNews?.logo?.logo_filename} name="newsLogo" label="اضافة صورة" accept="image/*" />
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
          <NewsContentArea
          name="content"
          formdata={newsContent.content || loadedNews?.content}
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
                     {loading ? "جاري الحفظ..." : "حفظ"}
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
