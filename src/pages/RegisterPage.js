import './LoginPage/login.css'
import { Link } from "react-router-dom"
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import { useState } from 'react'
import { validateFormRegister } from '../helpers'
import { useDispatch } from 'react-redux'
import { actRegisterAsync } from '../store/auth/actions'
import { useHistory } from 'react-router-dom';
import { useHookAuthenticated } from '../hooks/useNotAuthenticated'

function RegisterPage() {

  useHookAuthenticated()

  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [formData, setFormData] = useState({
    nickname: {
      value: '',
      error: '',
    },
    username: {
      value: '',
      error: '',
    },
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    }
  })

  function hadleOnChange(evt) {
    const name = evt.target.name
    const value = evt.target.value.trim()
    const error = validateFormRegister({ value, name })
    setFormData({
      ...formData,
      [name]: {
        value,
        error,
        isTouched: true
      }
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault()

    const isValid = checkFormIsValid()

    if (!isValid || loading) {
      return
    }

    setLoading(true)
    setFormError('')

    dispatch(
      actRegisterAsync({
        nickname: formData.nickname.value,
        username: formData.username.value,
        email: formData.email.value,
        password: formData.password.value
      })
    ).then(res => {
      if (res.ok) {
        history.push('/')
      } else {
        console.log('Error');
        setFormError(res.error)
      }
      setLoading(false)
    })

  }
  function checkFormIsValid() {

    const newFormData = {}

    Object.keys(formData).forEach(key => {
      const formValue = formData[key]
      newFormData[key] = { value: formValue.value, error: validateFormRegister({ value: formValue.value, name: key, isTouched: true, }) }
    })
    setFormData(newFormData)
    if (newFormData.email.error || newFormData.username.error || newFormData.password.error) {
      return false
    }
    return true
  }

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Đăng ký</h1>
            {formError && <p className='form-login__error'>{formError}</p>}
            <div className="form-login-register">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Input
                  label="Nickname"
                  placeholder="Nhập Nickname"
                  autoComplete="off"
                  value={formData.nickname.value}
                  name='nickname'
                  onChange={hadleOnChange}
                />
                <Input
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập ..."
                  autoComplete="off"
                  value={formData.username.value}
                  name='username'
                  onChange={hadleOnChange}
                  error={formData.username.error}
                  isShowEror
                />
                <Input
                  type="email"
                  label="Nhập email"
                  placeholder="Nhập email của bạn ..."
                  autoComplete="email"
                  name='email'
                  onChange={hadleOnChange}
                  error={formData.email.error}
                  isShowEror
                />
                <Input
                  type="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn ..."
                  autoComplete="new-password"
                  name='password'
                  onChange={hadleOnChange}
                  error={formData.password.error}
                  isShowEror
                />
                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button type="primary" size="large" loading={loading}>Đăng ký</Button>
                  <Link to="/login">Bạn đã có tài khoản?</Link>
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

export default RegisterPage