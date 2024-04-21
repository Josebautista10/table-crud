import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const api = 'http://localhost:3001/api'

  const [data, setData] = useState([])
  const [createOpenForm, setCreateOpenForm] = useState(false)
  const [editOpenForm, setEditOpenForm] = useState(false)
  const [editId, setEditId] = useState('')
  const [formData, setFormData] = useState({
    nobj: '',
    nocon: '',
    idarea: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(api)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const jsonData = await response.json()
      // jsonData.sort
      setData(jsonData.sort((a, b) => a.iddpo - b.iddpo))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    console.log(e.target.value)
  }

  const handleCreateForm = (id) => {
    setCreateOpenForm(!createOpenForm)
    setEditOpenForm(false)
    setFormData({
      nobj: '',
      nocon: '',
      idarea: ''
    })
  }

  const handleEditForm = (id) => {
    setEditOpenForm(true)
    setEditId(id)
    setCreateOpenForm(false)
    const editRow = data?.filter((row) => row.iddpo === id)

    const { nobj, nocon, idarea } = editRow[0]
    setFormData({
      nobj: nobj,
      nocon: nocon,
      idarea: idarea
    })
  }

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`${api}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to update data')
      }

      const updatedData = await response.json()
      fetchData()
      console.log('Updated data:', updatedData)
      // Do something with the updated data, e.g., display a success message
    } catch (error) {
      console.error('Error updating data:', error)
      // Handle error, e.g., display an error message
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${api}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to update data')
      }

      const deletedRow = await response.json()
      fetchData()
      console.log('Row deleted:', deletedRow)
    } catch (error) {
      console.error('Error deleting row:', error)
    }
  }

  const handleCreate = async () => {
    setCreateOpenForm(true)
    try {
      const response = await fetch(`${api}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Pass formData to the request body
      })

      if (!response.ok) {
        throw new Error('Failed to create row')
      }

      const newData = await response.json()
      setCreateOpenForm(false)

      setFormData({
        nobj: '',
        nocon: '',
        idarea: ''
      })
      fetchData()
      console.log('Created row:', newData)
      // Optionally, update the UI with the newly created row
    } catch (error) {
      console.error('Error creating row:', error)
    }
  }

  return (
    <div className='main-div'>
      <h1>Data from Express Server</h1>
      <div className='agregar-button-div'>
        <button onClick={() => handleCreateForm()}>Agregar</button>
      </div>
      <table className='data-table'>
        <thead>
          <tr>
            <th>iddpo</th>
            <th>nobj</th>
            <th>name</th>
            <th>idarea</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.iddpo}>
              <td>{item.iddpo}</td>
              <td>{item.nobj}</td>
              <td>{item.nocon}</td>
              <td>{item.idarea}</td>
              <td className='action-buttons'>
                <button onClick={() => handleEditForm(item.iddpo)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(item.iddpo)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {createOpenForm && (
        <div className='form-container'>
          <div className='form'>
            <h1>Crear nuevos datos</h1>
            <label>
              Objeto del contrato:
              <input
                type='text'
                name='nobj'
                value={formData.nobj}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Nombre del contratista:
              <input
                type='text'
                name='nocon'
                value={formData.nocon}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Área asignada:
              <select
                name='idarea'
                value={formData.idarea}
                onChange={handleChange} // Handle change for select element
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </label>
            <br />
            <button onClick={handleCreate}>Subir</button>
          </div>
        </div>
      )}

      {editOpenForm && (
        <div className='form-container'>
          <div className='form'>
            <h1>Estas editando datos de IDDPO: {editId}</h1>
            <label>
              Objeto del contrato:
              <input
                type='text'
                name='nobj'
                value={formData.nobj}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Nombre del contratista:
              <input
                type='text'
                name='nocon'
                value={formData.nocon}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Área asignada:
              <select
                name='idarea'
                value={formData.idarea}
                onChange={handleChange}
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </label>
            <br />
            <button onClick={() => handleEdit(editId)}>Editar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
