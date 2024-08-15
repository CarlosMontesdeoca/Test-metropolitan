import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, DatePicker, Form, Input, InputNumber, Table } from 'antd'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState([])

  const columns = [
    {title: 'Nombre', dataIndex: 'name'},
    {title: 'Fecha Nacimiento', dataIndex: 'brithday'},
    {title: 'Edad', dataIndex: 'year'}
  ]

  const getUsers = async () => {
    const reponse = await fetch("http://127.0.0.1:8000/api/users");

    const users = await reponse.json()
    setData(users)
  }

  useEffect(()=> {
    getUsers()
  }, [])

  const handleSubmit = async values => {
    try {
      const newData = {
        name: values.name.toUpperCase(),
        brithday: values.brithday.format('YYYY-MM-DD'),
        year: values.year
      }
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData),
      }).then(response => {
        console.log(response)
        getUsers()
        setIsOpen(!isOpen)
      })
    } catch (error) {
      console.log(error)
      window.alert('error')
    }
  }
  return (
    <section className='app'>
      <h1> Lista de Usuarios </h1>
      <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Cancelar': ' Nuevo'}</Button>
      {isOpen ? 
      <Form
        onFinish={handleSubmit}
      >
        <Form.Item name='name' label='Nombre' rules={[{required: true}]}>
          <Input placeholder='Nombre'/>
        </Form.Item>
        <Form.Item name='brithday' label='Fecha de nacimiento' rules={[{required: true}]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name='year' label='Edad' rules={[{required: true}]}>
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'> Crear </Button>
        </Form.Item>
      </Form>
      : 
      <Table
        dataSource={data}
        columns={columns}
      /> }
      


    </section>

  )
}

export default App
