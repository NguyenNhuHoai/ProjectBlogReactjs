import './login.css'
import { Link } from "react-router-dom"
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import { useState } from 'react'
import { validateFormdata } from '../../helpers'
import { useDispatch } from 'react-redux'
import { actLoginAsync } from '../../store/auth/actions'
import { useHookAuthenticated } from '../../hooks/useNotAuthenticated'

import { useHistory } from 'react-router-dom';



function LoginPage() {

  useHookAuthenticated()

  const history = useHistory()
  const dispatch = useDispatch()
  const [isFormDirty, setIsFormDirty] = useState(false)

  const [formError, setFormError] = useState('')

  const [loading, setLoadig] = useState(false)

  const [formData, setFormData] = useState({
    username: {
      value: '',
      error: ''
    },
    password: {
      value: '',
      error: ''
    }
  })




  function handleOnchange(evt) {
    const name = evt.target.name
    const value = evt.target.value.trim()
    const error = validateFormdata({ value, name })
    setFormData({
      ...formData,
      [name]: {
        value,
        error,
      }
    })
    setIsFormDirty(true)
  }


  function checkFormIsValid() {
    const fieldsToUpdate = Object.keys(formData);
    const updateFormData = { ...formData }
    if (!isFormDirty) {
      // Cách 1
      for (const field of fieldsToUpdate) {
        updateFormData[field].value = '';
        updateFormData[field].error = validateFormdata({
          value: '',
          name: field
        });
      }
      setFormData(updateFormData)

      // Cách 2
      // setFormData({
      //   username: {
      //     value: '',
      //     error: validateFormdata({
      //       value: '',
      //       name: 'username'
      //     })
      //   },
      //   password: {
      //     value: '',
      //     error: validateFormdata({
      //       value: '',
      //       name: 'password'
      //     })
      //   }
      // })
      return false
    }
    // Cách 1
    // if (formData.username.error || formData.password.error) {
    //   return false
    // }

    // Cách 2
    if (Object.values(formData).some(item => item.error)) {
      return false
    }
    return true
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const isValid = checkFormIsValid()
    if (!isValid) {
      return
    }
    if (loading) {
      return
    }
    setLoadig(true)
    setFormError('')
    dispatch(actLoginAsync(formData.username.value, formData.password.value))
      .then(res => {
        if (res.ok) {
          history.push('/')
        } else {
          console.log('Error');
          setFormError(res.error)
        }
        setLoadig(false)
      })
  }

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng nhập</h1>
            <div className="form-login-register">
              {formError && <p className='form-login__error'>{formError}</p>}
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Input
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập ..."
                  autoComplete="off"
                  value={formData.username.value}
                  name='username'
                  error={formData.username.error}
                  onChange={handleOnchange}
                  isShowEror
                />
                <Input
                  type="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn ..."
                  autoComplete="new-password"
                  value={formData.password.value}
                  name='password'
                  error={formData.password.error}
                  onChange={handleOnchange}
                  isShowEror
                />
                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button type="primary" size="large" loading={loading}>Đăng nhập</Button>
                  <Link to="/register">Đăng ký</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="spacing" />
    </main>

  )
}

export default LoginPage