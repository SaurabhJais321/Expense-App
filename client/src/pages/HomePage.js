import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Form, Input, Modal, Select, Table, message ,DatePicker} from "antd";
import Spinner from "./../components/Spinner";
import axios from "axios";
import moment from "moment";
import { UnorderedListOutlined, AreaChartOutlined,EditOutlined,DeleteOutlined} from "@ant-design/icons";
import Analytics from "../components/Analytics";
import { Navigate } from "react-router-dom";
const { RangePicker } = DatePicker;


const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [Loading,setLoading]=useState(false);
  const [transactionData,setTransactionData]=useState([]);
  const [frequency,setFrequency]=useState("365");
  const [selectDate,setSelectDate]=useState([]);
  const [type,setType]=useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable,setEditTable]=useState(null);
  const [get,setGet]=useState(false);
  

  const getTransaction=async()=>{
     try {
        const user=JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const data=await axios.post("/api/v1/transaction/get-transaction",{
             userId:user._id,
             frequency,selectDate,type
        });
        setLoading(false);
        setTransactionData(data.data.transaction);

     } catch ({error}) {
         setLoading(false);
         console.log(error);
     }
  }

  //useEffect....
useEffect(()=>{
  getTransaction();
},[frequency,selectDate,type,get]);

  const handleSubmit = async(values) => {
       const user=JSON.parse(localStorage.getItem("user"));
       setLoading(true);
       if(editable){
        await axios.post("/api/v1/transaction/edit-transaction",{
          payload:{
            ...values,userId:user._id
          },
          transactionId:editable._id,
         });
         setLoading(false);
         setShowModal(false); 
         setGet(!get)
         message.success("Transsaction Updated successfully");

       }
       else{      
         await axios.post("/api/v1/transaction/add-transaction",{
        ...values,userId:user._id,
       });
       setLoading(false);
       setShowModal(false); 
       message.success("Transsaction Added successfully");
       }
  
  };

  const deleteHandler= async(record)=>{
           try {
            setLoading(true);
            await axios.post("/api/v1/transaction/delete-transaction",{
              transactionId:record._id,
             });
             setLoading(false);
             setGet(!get);
             message.success("Deleted successfully"); 
           } catch (error) {
              setLoading(false);
              message.error("Error in delete Transaction"); 
           }
  }
 
  const column=[
      {
        title:"Date",
        dataIndex:"date",
        render:(text)=><span className="text-secondary">{moment(text).format("DD-MM-YYYY")}</span>
      },
      {
        title:"Amount",
        dataIndex:"amount",
      },
      {
        title:"Category",
        dataIndex:"category",
      },
      {
        title:"Type",
        dataIndex:"type",
      },
      {
        title:"Refrence",
        dataIndex:"refernce",
      },
      {
        title:"Actions",
        render:(text,record)=>(
              <div>
           <EditOutlined className="text-primary" onClick={()=>{
                 setEditTable(record);
                 setShowModal(true);
           }}/>
           <DeleteOutlined className="mx-2 text-danger" onClick={()=>deleteHandler(record)}/>
              </div>
        )
      }
  ];


  return (
    <Layout>
      {Loading && <Spinner/>}
      <div className="main-div"> <div className="filters">
        <div>
          <h6>select Frequency</h6>
          <Select value={frequency} onChange={(values)=>setFrequency(values)}>
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency==="custom" && <RangePicker value={selectDate} onChange={(values)=>setSelectDate(values)}/>}
        </div>
        <div>
        <h6>select Type</h6>
          <Select value={type} onChange={(values)=>setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expanse</Select.Option>
           
          </Select>
        </div>

        <div className="switch-icon" >
          <UnorderedListOutlined
            className={`mx-2 ${viewData==='table' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${viewData==='analytics' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData("analytics")}
          />
        </div>

        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div></div>
     

      <div className="content">
      {viewData==='table' ?<Table className="table-div" columns={column} dataSource={transactionData} /> : <Analytics   transactionData={transactionData}/> }
      </div>
      <Modal
        title={editable ? "Edit Transaction":"Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expanse</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="tip">Tip</Select.Option>
            <Select.Option value="project">Project</Select.Option>
            <Select.Option value="movie">Movie</Select.Option>
            <Select.Option value="bills">Bills</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="fee">Fee</Select.Option>
            <Select.Option value="tax">TAX</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Reference" name="refernce">
          <Input type="text" />
        </Form.Item>

       

        <div className="d-flex justify-content-end ">
          <button type="submit" className="btn btn-primary" >SAVE</button>
        </div>

        </Form>
       
      </Modal>
    </Layout>
  );
};

export default HomePage;