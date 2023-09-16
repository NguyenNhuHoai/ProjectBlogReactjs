import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


export function useHookAuthenticated() {
  const history = useHistory()
  const isAuthenticated = useSelector(state => Boolean(state.AUTH.token))
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated, history])
}