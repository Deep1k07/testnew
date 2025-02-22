import 'next-auth'


declare module 'next-auth'{
    interface User {
        _id?: string;
        username?: string;
        email?: string;
        role?: string;
    }
    interface Session {
        user:{
            _id?: string;
            username?: string;
            email?: string;
            role?: string;
        }& DefaultSession['user']
    }
    interface JWT {
        _id?: string;
        username?: string;
        email?: string;
        role?: string;
    }
}