import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: role = null,
        isLoading: roleLoading,
        refetch,
        isError,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email && !authLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user.email}`);
            return res.data.role;
        },
    });

    return { role, roleLoading, isError, refetch };
};

export default useUserRole;
