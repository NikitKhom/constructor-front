import { toKebabCaseCssString } from '../utils/cssTransformations';
import React from 'react';

export interface StyleData {
  id: string;
  name: string;
  formCss: string;
  inputCss: string;
  buttonCss: string;
}

export type StyleDataToSave = Omit<StyleData, 'id'>;

interface ApiResponse<T> {
  message: string;
  data?: T;
}

const API_BASE_URL = 'http://localhost:3000';

async function handleApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    let errorMessage = `Ошибка ${response.status}: ${response.statusText || 'Неизвестная ошибка'}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (jsonError) {
      console.warn('Не удалось распарсить JSON ошибки из ответа:', jsonError);
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

export const saveStyle = async (styleData: { name: string; form_css: React.CSSProperties; input_css: React.CSSProperties; button_css: React.CSSProperties }): Promise<ApiResponse<StyleData>> => {
  console.log('На отправку', styleData.form_css)
  const dataToSend = {
    name: styleData.name,
    formCss: toKebabCaseCssString(styleData.form_css),
    inputCss: toKebabCaseCssString(styleData.input_css),
    buttonCss: toKebabCaseCssString(styleData.button_css),
  };
  try {
    const response = await fetch(`${API_BASE_URL}/styles`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    return await handleApiResponse<StyleData>(response);
  } catch (error) {
    console.error('Ошибка в API-сервисе saveStyle:', error);
    throw error;
  }
};

export const updateStyle = async (styleData: { id: string; name: string; form_css: React.CSSProperties; input_css: React.CSSProperties; button_css: React.CSSProperties }): Promise<ApiResponse<StyleData>> => {
  if (!styleData.id) {
    throw new Error('Для обновления стиля требуется id.');
  }
  const dataToSend = {
    name: styleData.name,
    formCss: toKebabCaseCssString(styleData.form_css),
    inputCss: toKebabCaseCssString(styleData.input_css),
    buttonCss: toKebabCaseCssString(styleData.button_css),
  };
  try {
    const response = await fetch(`${API_BASE_URL}/styles/${styleData.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    return await handleApiResponse<StyleData>(response);
  } catch (error) {
    console.error('Ошибка в API-сервисе updateStyle:', error);
    throw error;
  }
};

export const deleteStyle = async (styleId: string): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/styles/${styleId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {},
    });
    return await handleApiResponse<any>(response);
  } catch (error) {
    console.error('Ошибка в API-сервисе deleteStyle:', error);
    throw error;
  }
};

export const getStyles = async (): Promise<ApiResponse<StyleData[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/styles`, {
      method: 'GET',
      credentials: 'include',
      headers: {},
    });
    return await handleApiResponse<StyleData[]>(response);
  } catch (error) {
    console.error('Ошибка в API-сервисе getStyles:', error);
    throw error;
  }
};