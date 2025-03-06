"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon} from 'lucide-react'
import Image from 'next/image';

export default function SignInForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="flex items-center">
            <Image src="/logo.svg"
            className='w-fit'
             alt="Logo"
              width={24}
               height={24} />
            </div>
          </div>
          <p className="text-sm font-normal font-sans">AI-Powered Lesson Planning Assistant</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-normal font-roboto text-gray">Sign Up</h2>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="youremail@example.com" 
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                className="w-full pr-10" 
                placeholder="********"
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 
                  <EyeOffIcon className="h-5 w-5 text-gray-400" /> : 
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                }
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <Input 
                id="confirmPassword" 
                placeholder='********'
                type={showConfirmPassword ? "text" : "password"} 
                className={`w-full pr-10 ${!passwordsMatch ? "border-red-500" : ""}`}
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? 
                  <EyeOffIcon className="h-5 w-5 text-gray-400" /> : 
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                }
              </button>
            </div>
            {!passwordsMatch && (
              <p className="text-sm text-red-500">Passwords doesn't match. Try again</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="font-sans font-normal text-sm leading-5 tracking-[-0.2px]">
              I agree to the <a href="#" className="text-blue hover:underline">Terms</a> and <a href="#" className="text-blue hover:underline">Privacy Policy</a>
            </Label>
          </div>
          
          <Button className="w-full bg-blue hover:bg-blue-600">
            Create account
          </Button>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account? <a href="#" className="text-blue hover:underline">Sign In</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}