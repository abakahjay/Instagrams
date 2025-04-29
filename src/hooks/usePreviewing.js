import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [formDatas, setFormDatas] = useState(null);
	const [formDatas2, setFormDatas2] = useState(null);
	const showToast = useShowToast();
	const maxFileSizeInBytes = 10 * 1024 * 1024; // 10MB

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			if (file.size > maxFileSizeInBytes) {
				showToast("Error", "File size must be less than 2MB", "error");
				setSelectedFile(null);
				return;
			}
			const reader = new FileReader();

			const formDatase = new FormData();
            formDatase.append("profile_pictures", file);

			const formDatase2 = new FormData();
            formDatase2.append("file", file);
			
			reader.onloadend = () => {
				setFormDatas(formDatase);
				setFormDatas2(formDatase2);
				setSelectedFile(reader.result);
			};

			reader.readAsDataURL(file);
		} else {
			showToast("Error", "Please select an image file", "error");
			setSelectedFile(null);
		}
	};

	return {formDatas,formDatas2, selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
