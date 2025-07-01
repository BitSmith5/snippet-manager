'use client';

import { useState } from 'react';
import { createSnippetSchema, loginSchema, signupSchema } from '@/types/snippet';
import { validateData } from '@/lib/validation';

export default function ValidationExample() {
  const [snippetData, setSnippetData] = useState({
    title: '',
    content: '',
    language: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testSnippetValidation = () => {
    const validation = validateData(createSnippetSchema, snippetData);
    if (validation.success) {
      addResult(`✅ Snippet validation passed: ${JSON.stringify(validation.data)}`);
    } else {
      addResult(`❌ Snippet validation failed: ${validation.error}`);
    }
  };

  const testLoginValidation = () => {
    const validation = validateData(loginSchema, loginData);
    if (validation.success) {
      addResult(`✅ Login validation passed: ${JSON.stringify(validation.data)}`);
    } else {
      addResult(`❌ Login validation failed: ${validation.error}`);
    }
  };

  const testSignupValidation = () => {
    const validation = validateData(signupSchema, signupData);
    if (validation.success) {
      addResult(`✅ Signup validation passed: ${JSON.stringify(validation.data)}`);
    } else {
      addResult(`❌ Signup validation failed: ${validation.error}`);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Zod Validation Demo</h2>
        <p className="text-blue-700 text-sm">
          This component demonstrates the new Zod validation system. Try entering invalid data to see validation errors.
        </p>
      </div>

      {/* Snippet Validation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Snippet Validation</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={snippetData.title}
              onChange={(e) => setSnippetData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter snippet title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={snippetData.content}
              onChange={(e) => setSnippetData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Enter code content"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <input
              type="text"
              value={snippetData.language}
              onChange={(e) => setSnippetData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., JavaScript"
            />
          </div>
          <button
            onClick={testSnippetValidation}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Test Snippet Validation
          </button>
        </div>
      </div>

      {/* Login Validation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Login Validation</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter password"
            />
          </div>
          <button
            onClick={testLoginValidation}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Test Login Validation
          </button>
        </div>
      </div>

      {/* Signup Validation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Signup Validation</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={signupData.email}
              onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={signupData.password}
              onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter password (min 6 chars)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={signupData.confirmPassword}
              onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Confirm password"
            />
          </div>
          <button
            onClick={testSignupValidation}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Test Signup Validation
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Validation Results</h3>
          <button
            onClick={clearResults}
            className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
          >
            Clear
          </button>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 max-h-64 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-gray-500 text-sm">No validation tests run yet. Try testing the forms above.</p>
          ) : (
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 