import React, { Suspense, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import api from "../../../data/axiosConfig";
import {Button, Col,Form, notification} from "antd"
import { Await, defer, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../../components/ui/Spinner/Spinner';
import "./AddNews.scss"
import { getNews } from '../../../util/api';
import InputFile from '../../../components/form/InputFile';
import FormInput from '../../../components/form/FormInput';
import NewsContentArea from './components/NewsContentArea';


const AddNews = () => {
  
    const newsLoader = useLoaderData();
    const { id } = useParams();
    const navigate = useNavigate();
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
      const formData = new FormData();
      formData.append("newsLogo", values.newsLogo?.file);
      formData.append("title", values.title);
      formData.append("content", newsContent.content);
      if (id) {
        formData.append("_method", "PUT");
      }
  
      const URL = id ? `api/news/${id}` : `api/news`;
      const headers = {
        "Content-Type": "multipart/form-data",
      };
  
      try {
        setLoading(true);
        await api().post(URL, formData, {
          headers,
        });
        notification.success({
          message: `تمت ${id ? "تحديث" : "اضافة"} الخبر  بنجاح`,
        });
        setLoading(false);
        navigate('/admin/manage-news')
      } catch (error) {
        console.log(error);
        notification.error({ message: "فشل تحديث البيانات" });
        setLoading(false);
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
