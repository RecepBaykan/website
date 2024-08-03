import React from 'react';
import axios from 'axios';
import Base from 'antd/es/typography/Base';


const BASE_URL = 'http://localhost:8080/api/content';

export const listContents = () => axios.get(BASE_URL);

export const createContent = (content) => axios.post(BASE_URL, content); 

export const getContent = (id) => axios.get(BASE_URL + "/" + id)

export const updateContent = (id, content) => axios.put(BASE_URL + '/' + id, content)

export const deleteContent  = (id) => axios.delete(BASE_URL + '/' + id);