import './input.css'
import cls from 'classnames'
import { useState } from 'react'
import IconSearch from '../IconSearch'

function Input({
  label,
  type = 'text',
  className,
  icon = <IconSearch />,
  error,
  isShowEror,
  ...restProps
}) {
  const [localType, setLocalType] = useState(type)

  function handleToggleShowPwd() {
    if (localType === 'password') {
      setLocalType('text')
    } else if (localType === 'text') {
      setLocalType('password')
    }
  }

  const classesIconPwd = cls('toggle-password', {
    'ion-eye': localType === 'password',
    'ion-eye-disabled': localType === 'text'
  })
  const classesSearch = cls('input-search__input', className)

  if (type === 'search') {
    return (
      <div className="input-search" style={{ color: '#17202A' }}>
        {icon}
        <input
          className={classesSearch}
          type={localType}
          {...restProps}
        />
      </div>
    )
  }

  return (
    <div className={cls('form-control', {
      'form-control__has-error': error
    })}>
      {label && <label>{label}</label>}
      <div className='form-controll__input'>
        {type === 'password' && (
          <i className={classesIconPwd} onClick={handleToggleShowPwd}></i>
        )}
        <input  style={{ color: 'black' }} type={localType} className={className} {...restProps} />
      </div>
      {error && isShowEror && <span className='form-control__error'>{error}</span>}
    </div>
  )
}

export default Input