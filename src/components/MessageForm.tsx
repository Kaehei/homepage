import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import LoadingSpinner from './loading-spinner';

export default function MessageForm() {
  const [formData, setFormData] = useState({
    author: '',
    mail: '',
    url: '',
    text: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单的表单验证
    if (!formData.author || !formData.mail || !formData.text) {
      toast.error('请填写必填字段');
      return;
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      toast.error('请输入有效的邮箱地址');
      return;
    }

    setSubmitting(true);

    try {
      // 实际的API调用
      const response = await fetch('https://blog.kaeshi.top/api-comment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          cid: '2',
          author: formData.author,
          mail: formData.mail,
          text: formData.text,
          parent: '0'
        })
      });

      // 检查响应是否成功
      if (!response.ok) {
        // 尝试获取错误信息
        let errorMessage = `请求失败 (状态码: ${response.status})`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // 如果无法解析JSON，使用默认错误消息
        }
        throw new Error(errorMessage);
      }

      toast.success('留言发布成功！');
      setFormData({ author: '', mail: '', url: '', text: '' });
      
      // 成功后刷新留言板
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      // 提供更友好的错误信息
      const errorMessage = error instanceof Error ? error.message : '留言发布失败，请稍后再试';
      toast.error(errorMessage);
      console.error('Failed to submit comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-1">
            昵称
          </label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="请输入您的昵称"
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="mail" className="block text-sm font-medium mb-1">
            邮箱
          </label>
          <Input
            id="mail"
            name="mail"
            type="email"
            value={formData.mail}
            onChange={handleChange}
            placeholder="请输入您的邮箱"
            required
            className="w-full"
          />
        </div>
      </div>
      <div>
        <label htmlFor="text" className="block text-sm font-medium mb-1">
          留言内容
        </label>
        <textarea
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="请输入您的留言内容"
          required
          rows={4}
          className="w-full rounded-md border border-border px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? (
            <div className="flex items-center">
              <LoadingSpinner />
            </div>
          ) : (
            '发布留言'
          )}
      </Button>
    </form>
  );
}