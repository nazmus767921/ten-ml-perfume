"use client"

import { useState } from "react"
import { useUserStore } from "@/lib/stores/user-store"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@phosphor-icons/react"

export default function SettingsForm() {
  const user = useUserStore((s) => s.user)
  const updateProfile = useUserStore((s) => s.updateProfile)
  const updateAddress = useUserStore((s) => s.updateAddress)

  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [phone, setPhone] = useState(user?.phone ?? "")
  const [fullName, setFullName] = useState(user?.shippingAddress?.fullName ?? "")
  const [phoneNumber, setPhoneNumber] = useState(user?.shippingAddress?.phoneNumber ?? "")
  const [shipEmail, setShipEmail] = useState(user?.shippingAddress?.email ?? "")
  const [district, setDistrict] = useState(user?.shippingAddress?.district ?? "")
  const [area, setArea] = useState(user?.shippingAddress?.area ?? "")
  const [streetAddress, setStreetAddress] = useState(user?.shippingAddress?.streetAddress ?? "")

  if (!user) return null

  const handleProfileSave = () => {
    updateProfile({ name, email, phone })
    toast.success("Profile updated")
  }

  const handleAddressSave = () => {
    updateAddress({
      fullName,
      phoneNumber,
      email: shipEmail,
      district,
      area,
      streetAddress,
    })
    toast.success("Shipping address updated")
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="size-4" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <InputGroup>
            <InputGroupAddon>
              <UserIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <EnvelopeIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <PhoneIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
          <div className="flex justify-end">
            <Button onClick={handleProfileSave}>Save Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Shipping Address Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPinIcon className="size-4" />
            Default Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <InputGroup>
            <InputGroupAddon>
              <UserIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <PhoneIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <EnvelopeIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Email"
              type="email"
              value={shipEmail}
              onChange={(e) => setShipEmail(e.target.value)}
            />
          </InputGroup>
          <div className="grid grid-cols-2 gap-3">
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>District</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                placeholder="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>Area</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </InputGroup>
          </div>
          <InputGroup>
            <InputGroupAddon>
              <MapPinIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Street address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </InputGroup>
          <div className="flex justify-end">
            <Button onClick={handleAddressSave}>Save Address</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
