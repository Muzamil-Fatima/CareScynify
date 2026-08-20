import { api } from "../axios";

/*

| ADMIN USERS API

*/

/*

| GET ALL USERS

*/
export const getUsers = async (params = {}) => {
  const res = await api.get("/api/admin/users", {
    params,
  });

  return res.data;
};

/*

| GET SINGLE USER

*/
export const getUserById = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const res = await api.get(`/api/admin/users/${id}`);

  return res.data;
};

/*

| GET USER STATISTICS

*/
export const getUserStats = async () => {
  const res = await api.get("/api/admin/users/stats");

  return res.data;
};

/*

| VERIFY USER

*/
export const verifyUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const res = await api.patch(`/api/admin/users/${id}/verify`);

  return res.data;
};

/*

| REJECT USER

*/
export const rejectUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const res = await api.patch(`/api/admin/users/${id}/reject`);

  return res.data;
};

/*

| SUSPEND USER

*/
export const suspendUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const res = await api.patch(`/api/admin/users/${id}/suspend`);

  return res.data;
};

/*

| ACTIVATE USER

*/
export const activateUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const res = await api.patch(`/api/admin/users/${id}/activate`);

  return res.data;
};

/*

| TOGGLE USER STATUS

*/
export const toggleUserStatus = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const res = await api.patch(`/api/admin/users/${id}/status`);

  return res.data;
};

/*

| DELETE USER

*/
export const deleteUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const res = await api.delete(`/api/admin/users/${id}`);

  return res.data;
};

/*

| RESTORE USER

*/
export const restoreUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const res = await api.patch(`/api/admin/users/${id}/restore`);

  return res.data;
};
