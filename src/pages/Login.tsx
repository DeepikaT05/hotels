import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Lock, Mail, Hotel } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            toast.success('Login successful!');
            navigate('/admin');
        } catch (error) {
            toast.error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-2 border-primary/20 bg-white/95 backdrop-blur-md shadow-2xl">
                    <CardHeader className="space-y-4 text-center">
                        <motion.div
                            className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Hotel className="w-8 h-8 text-white" />
                        </motion.div>
                        <div>
                            <CardTitle className="text-3xl font-display gradient-text">
                                Vivanz Palace
                            </CardTitle>
                            <CardDescription className="text-base mt-2 text-charcoal/70">
                                Admin Portal
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <motion.div
                                className="space-y-2"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Label htmlFor="email" className="text-sm font-body text-charcoal">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@vivanzpalace.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-muted/50 border-2 border-border hover:border-primary/40 focus:border-primary text-charcoal"
                                        required
                                    />
                                </div>
                            </motion.div>
                            <motion.div
                                className="space-y-2"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Label htmlFor="password" className="text-sm font-body text-charcoal">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 bg-muted/50 border-2 border-border hover:border-primary/40 focus:border-primary text-charcoal"
                                        required
                                    />
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold text-white shadow-lg hover:shadow-xl"
                                    disabled={loading}
                                >
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </motion.div>
                        </form>
                        <motion.div
                            className="mt-6 text-center text-sm text-charcoal/60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <p className="font-semibold text-charcoal mb-2">Demo Credentials:</p>
                            <div className="space-y-1">
                                <p>
                                    <span className="text-primary font-semibold">Super Admin:</span> admin@vivanzpalace.com
                                </p>
                                <p>
                                    <span className="text-accent font-semibold">Receptionist:</span> reception@vivanzpalace.com
                                </p>
                                <p>
                                    <span className="text-purple font-semibold">Restaurant:</span> restaurant@vivanzpalace.com
                                </p>
                            </div>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
