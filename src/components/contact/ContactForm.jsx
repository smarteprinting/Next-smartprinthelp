"use client";
import React, { useState } from 'react';
import api from '@/lib/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    subject: '',
    message: '',
    save: false
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newError = {};
    if (!formData.name.trim()) newError.name = true;
    if (!formData.email.trim()) newError.email = true;
    if (!formData.number.trim()) newError.number = true;
    if (!formData.subject.trim()) newError.subject = true;
    if (!formData.message.trim()) newError.message = true;
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error[name]) setError(prev => ({ ...prev, [name]: false }));
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSuccess('');
    setError({});
    try {
      await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.number,
        subject: formData.subject,
        message: formData.message
      });
      setSuccess('Message sent successfully!');
      setFormData({ name: '', email: '', number: '', subject: '', message: '', save: false });
    } catch (err) {
      console.error('Contact form error:', err);
      setError({ submit: err.message || 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {success && <p className="text-green-600 text-base font-medium">{success}</p>}
      {error.submit && <p className="text-red-500 text-base font-medium">{error.submit}</p>}
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name *"
          className={`w-full px-4 py-3 border rounded focus:outline-none text-base ${error.name ? 'border-red-400' : 'border-gray-300'}`}
        />
        {error.name && <p className="text-red-500 text-sm mt-1">This field is required.</p>}
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email *"
          className={`w-full px-4 py-3 border rounded focus:outline-none text-base ${error.email ? 'border-red-400' : 'border-gray-300'}`}
        />
        {error.email && <p className="text-red-500 text-sm mt-1">This field is required.</p>}
      </div>
      <div>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Phone Number *"
          className={`w-full px-4 py-3 border rounded focus:outline-none text-base ${error.number ? 'border-red-400' : 'border-gray-300'}`}
        />
        {error.number && <p className="text-red-500 text-sm mt-1">This field is required.</p>}
      </div>
      <div>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject *"
          className={`w-full px-4 py-3 border rounded focus:outline-none text-base ${error.subject ? 'border-red-400' : 'border-gray-300'}`}
        />
        {error.subject && <p className="text-red-500 text-sm mt-1">This field is required.</p>}
      </div>
      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message *"
          rows={4}
          className={`w-full px-4 py-3 border rounded focus:outline-none text-base resize-none ${error.message ? 'border-red-400' : 'border-gray-300'}`}
        />
        {error.message && <p className="text-red-500 text-sm mt-1">This field is required.</p>}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="save"
          id="save"
          checked={formData.save}
          onChange={handleChange}
          className="accent-[#EF4056] w-4 h-4"
        />
        <label htmlFor="save" className="text-base text-gray-800 select-none">Save my name, email and phone in this browser</label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-[#EF4056] text-white px-7 py-2.5 rounded font-bold text-base uppercase tracking-wider hover:bg-[#d93548] transition-colors"
      >
        {loading ? 'SENDING...' : 'SEND'}
      </button>
    </form>
  );
};

export default ContactForm;
