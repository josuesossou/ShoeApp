import { useRouter } from 'next/router';
import NotVerifiedUser from '../../src/components/errors/NotVerified';

export default function NotVerifyed() {
  const router = useRouter()
  const { email } = router.query

  return (
    <NotVerifiedUser email={email} />
  )
}
