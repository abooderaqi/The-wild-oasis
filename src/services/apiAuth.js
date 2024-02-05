import supabase from "./supabase"

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)
  return data
}

export const getUser = async () => {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)
  return user
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) throw new Error(error.message)
}
