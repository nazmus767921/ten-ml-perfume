"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import type { ShippingAddress } from "@/lib/types/order"

const DISTRICT_AREAS: Record<string, string[]> = {
  Dhaka: ["Dhanmondi", "Gulshan", "Mirpur", "Uttara", "Banani", "Mohammadpur", "Bashundhara R/A", "Shyamoli", "Motijheel", "Farmgate"],
  Chattogram: ["Agrabad", "Halishahar", "Nasirabad", "Panchlaish", "Kotwali", "Bayezid", "Double Mooring", "Pahartali"],
  Rajshahi: ["Boalia", "Motihar", "Shah Makhdum", "Paba", "Kazla"],
  Khulna: ["Khalishpur", "Sonadanga", "Daulatpur", "Khanjahan Ali", "Harintana"],
  Barishal: ["Sadar", "Rupatoli", "Nathullabad", "Gournadi"],
  Sylhet: ["Shibganj", "Zindabazar", "Subidbazar", "Mirabazar", "Tilagor"],
  Rangpur: ["Sadar", "Carmichael", "Haragach", "Mominpur"],
  Mymensingh: ["Sadar", "Kewatkhali", "Biddyaganj", "Shombhuganj"],
}

const DISTRICTS = Object.keys(DISTRICT_AREAS).sort()

interface ShippingAddressFormProps {
  value: ShippingAddress
  onChange: (addr: ShippingAddress) => void
  errors?: Partial<Record<keyof ShippingAddress, string>>
}

export function ShippingAddressForm({ value, onChange, errors = {} }: ShippingAddressFormProps) {
  const selectedDistrict = value.district || ""
  const areas = selectedDistrict ? (DISTRICT_AREAS[selectedDistrict] ?? []) : []

  const update = (field: keyof ShippingAddress, fieldValue: string) => {
    const updateObj: Partial<ShippingAddress> = { [field]: fieldValue }

    if (field === "district") {
      updateObj.area = ""
    }

    onChange({ ...value, ...updateObj })
  }

  const id = (field: string) => `checkout-${field}`

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FieldWrapper label="Full Name" error={errors.fullName} htmlFor={id("fullName")}>
          <Input
            id={id("fullName")}
            placeholder="John Doe"
            value={value.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
          />
        </FieldWrapper>
        <FieldWrapper label="Phone Number" error={errors.phoneNumber} htmlFor={id("phoneNumber")}>
          <Input
            id={id("phoneNumber")}
            placeholder="017XXXXXXXX"
            value={value.phoneNumber}
            onChange={(e) => update("phoneNumber", e.target.value)}
            aria-invalid={!!errors.phoneNumber}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Email" error={errors.email} htmlFor={id("email")}>
        <Input
          id={id("email")}
          type="email"
          placeholder="john@example.com"
          value={value.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
        />
      </FieldWrapper>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FieldWrapper label="District" error={errors.district} htmlFor={id("district")}>
          <NativeSelect
            id={id("district")}
            value={value.district}
            onChange={(e) => update("district", e.target.value)}
            aria-invalid={!!errors.district}
            className="w-full"
          >
            <NativeSelectOption value="" disabled>
              Select district
            </NativeSelectOption>
            {DISTRICTS.map((d) => (
              <NativeSelectOption key={d} value={d}>
                {d}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </FieldWrapper>
        <FieldWrapper label="Area" error={errors.area} htmlFor={id("area")}>
          <NativeSelect
            id={id("area")}
            value={value.area}
            onChange={(e) => update("area", e.target.value)}
            aria-invalid={!!errors.area}
            className="w-full"
            disabled={!selectedDistrict}
          >
            <NativeSelectOption value="" disabled>
              {selectedDistrict ? "Select area" : "Select district first"}
            </NativeSelectOption>
            {areas.map((a) => (
              <NativeSelectOption key={a} value={a}>
                {a}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </FieldWrapper>
      </div>

      <FieldWrapper label="Street Address" error={errors.streetAddress} htmlFor={id("streetAddress")}>
        <Textarea
          id={id("streetAddress")}
          placeholder="House #, Road #, Building name..."
          value={value.streetAddress}
          onChange={(e) => update("streetAddress", e.target.value)}
          aria-invalid={!!errors.streetAddress}
        />
      </FieldWrapper>

      <FieldWrapper label="Order Notes (Optional)" error={errors.orderNotes} htmlFor={id("orderNotes")}>
        <Textarea
          id={id("orderNotes")}
          placeholder="Any special instructions..."
          value={value.orderNotes ?? ""}
          onChange={(e) => update("orderNotes", e.target.value)}
        />
      </FieldWrapper>
    </div>
  )
}

function FieldWrapper({ label, error, htmlFor, children }: { label: string; error?: string; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
