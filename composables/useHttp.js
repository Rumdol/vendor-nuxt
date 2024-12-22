export const useHttp = async (url, options = {}) => {
  const config = useRuntimeConfig()
  const baseURL = `${config.public.serverApiUrl}/${config.public.apiVersion}`
  const cookie = useCookie('access_token')
  const token = cookie.value

  // Remove body for GET requests
  if (options.method === 'GET') {
    delete options.body
  }

  // Configure request headers
  options = {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      // Set Content-Type only if not using FormData
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    // Ensure the body is either FormData or JSON
    body: options.body instanceof FormData ? options.body : JSON.stringify(options.body),
    async onResponseError({ request, response, options }) {
      if (response.status === 401) {
        cookie.value = null // Clear the token on 401
      } else if (response.status !== 422) {
        ElMessage.error(response.data?.message || 'Unknown error')
      }
    },
  }

  try {
    return await $fetch(url, { baseURL, ...options })
  } catch (error) {
    console.error('HTTP Request failed:', error)
    ElMessage.error(error.message || 'Unknown error occurred')
    throw error
  }
}
