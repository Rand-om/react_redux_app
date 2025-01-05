import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deletePost } from "../redux/slices/postSlice";

export const PostsTable = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { filteredPosts } = useSelector((state: RootState) => state.posts);

    const handleDeletePost = (itemId: number) => {
        dispatch(deletePost(itemId))
    }

    return (
        <div className="container" id="postsTable">
            <table cellSpacing={10} width={'100%'}>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Descripción</td>
                        <td>Acción</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredPosts.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    <button onClick={() => handleDeletePost(item.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}