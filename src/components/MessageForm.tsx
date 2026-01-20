import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import LoadingSpinner from './loading-spinner';
import { Send } from 'lucide-react';

export default function MessageForm() {
  const [formData, setFormData] = useState({
    author: '',
    mail: '',
    url: '',
    text: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.author || !formData.mail || !formData.text) {
      toast.error('请填写必填字段');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      toast.error('请输入有效的邮箱地址');
      return;
    }

    setSubmitting(true);

    try {
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

      if (!response.ok) {
        let errorMessage = `请求失败 (状态码: ${response.status})`;
        try {
          const errorData = await response.json();
          if (errorData.message) errorMessage = errorData.message;
        } catch (e) { }
        throw new Error(errorMessage);
      }

      toast.success('留言发布成功！');
      setFormData({ author: '', mail: '', url: '', text: '' });
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '留言发布失败，请稍后再试';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const formItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial="hidden"
      animate="show"
      variants={{
        show: { transition: { staggerChildren: 0.1 } }
      }}
    >
      <div className="space-y-4">
        <motion.div variants={formItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="author" className="text-xs font-medium text-muted-foreground ml-1">昵称 / Name</label>
            <div className="relative group">
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                onFocus={() => setFocusedField('author')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your name"
                required
                className="bg-muted/50 border-transparent focus:bg-background transition-all duration-300 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${focusedField === 'author' ? 'w-full' : 'w-0'}`} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="mail" className="text-xs font-medium text-muted-foreground ml-1">邮箱 / Email</label>
            <div className="relative group">
              <Input
                id="mail"
                name="mail"
                type="email"
                value={formData.mail}
                onChange={handleChange}
                onFocus={() => setFocusedField('mail')}
                onBlur={() => setFocusedField(null)}
                placeholder="your@email.com"
                required
                className="bg-muted/50 border-transparent focus:bg-background transition-all duration-300 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${focusedField === 'mail' ? 'w-full' : 'w-0'}`} />
            </div>
          </div>
        </motion.div>

        <motion.div variants={formItem} className="space-y-1.5">
          <label htmlFor="text" className="text-xs font-medium text-muted-foreground ml-1">留言 / Message</label>
          <div className="relative group">
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              onFocus={() => setFocusedField('text')}
              onBlur={() => setFocusedField(null)}
              placeholder="Say something nice..."
              required
              rows={4}
              className="w-full rounded-xl border-transparent bg-muted/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:bg-background focus:outline-none focus:ring-0 transition-all duration-300 resize-none"
            />
            <div className={`absolute bottom-1.5 left-0 h-[2px] bg-primary transition-all duration-300 ${focusedField === 'text' ? 'w-full' : 'w-0'}`} />
          </div>
        </motion.div>
      </div>

      <motion.div variants={formItem}>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl h-12 text-base font-medium transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
        >
          {submitting ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner />
              <span>Sending...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Send Message</span>
              <Send className="w-4 h-4 ml-1" />
            </div>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}