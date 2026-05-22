interface SSLCommerzConfig {
  storeId: string
  storePassword: string
  isSandbox: boolean
}

function getConfig(): SSLCommerzConfig {
  return {
    storeId: process.env.SSLCZ_STORE_ID || "testbox",
    storePassword: process.env.SSLCZ_STORE_PASSWD || "qwerty",
    isSandbox: process.env.SSLCZ_IS_SANDBOX !== "false",
  }
}

function getBaseUrl(): string {
  const config = getConfig()
  return config.isSandbox
    ? "https://sandbox.sslcommerz.com"
    : "https://securepay.sslcommerz.com"
}

export interface SSLCommerzInitParams {
  totalAmount: number
  tranId: string
  cusName: string
  cusPhone: string
  cusEmail: string
  cusAddress: string
  cusCity: string
  productName: string
  productCategory: string
  successUrl: string
  failUrl: string
  cancelUrl: string
  ipnUrl?: string
}

export interface SSLCommerzInitResponse {
  status: "SUCCESS" | "FAILED"
  failedreason?: string
  sessionkey?: string
  GatewayPageURL?: string
}

export interface SSLCommerzValidationResponse {
  status: "VALID" | "INVALID" | "VALIDATED"
  tran_id?: string
  val_id?: string
  amount?: string
  currency?: string
  card_type?: string
  store_amount?: string
  error?: string
}

export async function initiateSSLSession(
  params: SSLCommerzInitParams,
  timeoutMs = 10000,
): Promise<SSLCommerzInitResponse> {
  const config = getConfig()
  const formData = new URLSearchParams()
  formData.append("store_id", config.storeId)
  formData.append("store_passwd", config.storePassword)
  formData.append("total_amount", params.totalAmount.toFixed(2))
  formData.append("currency", "BDT")
  formData.append("tran_id", params.tranId)
  formData.append("success_url", params.successUrl)
  formData.append("fail_url", params.failUrl)
  formData.append("cancel_url", params.cancelUrl)
  if (params.ipnUrl) formData.append("ipn_url", params.ipnUrl)
  formData.append("cus_name", params.cusName)
  formData.append("cus_phone", params.cusPhone)
  formData.append("cus_email", params.cusEmail)
  formData.append("cus_add1", params.cusAddress)
  formData.append("cus_city", params.cusCity)
  formData.append("cus_country", "Bangladesh")
  formData.append("shipping_method", "YES")
  formData.append("ship_name", params.cusName)
  formData.append("ship_add1", params.cusAddress)
  formData.append("ship_city", params.cusCity)
  formData.append("ship_country", "Bangladesh")
  formData.append("ship_postcode", "1000")
  formData.append("product_name", params.productName)
  formData.append("product_category", params.productCategory)
  formData.append("product_profile", "physical-goods")

  const initUrl = `${getBaseUrl()}/gwprocess/v4/api.php`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(initUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`SSLCommerz API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("SSLCommerz initiation timed out")
    }
    throw error
  } finally {
    clearTimeout(timeout)
  }
}

export async function validateSSLTransaction(
  valId: string,
  timeoutMs = 10000,
): Promise<SSLCommerzValidationResponse> {
  const config = getConfig()
  const url = new URL(`${getBaseUrl()}/validator/api/validationserverAPI.php`)
  url.searchParams.set("val_id", valId)
  url.searchParams.set("store_id", config.storeId)
  url.searchParams.set("store_passwd", config.storePassword)
  url.searchParams.set("v", "1")
  url.searchParams.set("format", "json")

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url.toString(), {
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`SSLCommerz validation error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("SSLCommerz validation timed out")
    }
    throw error
  } finally {
    clearTimeout(timeout)
  }
}
