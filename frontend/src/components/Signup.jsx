import React from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
const Signup = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <form action="">
        <div>
          <Label>Full Name</Label>
          <Input
          type="text"
          name="fullname"
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
          type="email"
          name="email"
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
          type="password"
          name="password"
          />
        </div>
      </form>
    </div>
  )
}

export default Signup;
