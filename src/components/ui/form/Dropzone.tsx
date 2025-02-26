'use client';

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import type { DropzoneProps } from "@/types/props";

export default function Dropzone({setImg}: DropzoneProps) {
    const [previewImg, setPreviewImg] = useState<string | null>(null);

    const onDropRejected = () => console.log("Error (Max. 10Mb, 'jpeg/png')*");

    const onDropAccepted = useCallback(async (acceptedFiles: Array<File>) => {
        const formData = new FormData();

        formData.append('img-servicez', acceptedFiles[0]);

        //console.log(acceptedFiles[0])

        if (acceptedFiles.length > 0) {
            //changeDrop(acceptedFiles[0])
            setImg(acceptedFiles[0]);

            //important code to show a preview image to the user, just get the input file and then pass it to this url and then place it in the image tag and that's it!!!!!
            const url = URL.createObjectURL(acceptedFiles[0]);

            setPreviewImg(url);
            //setErrorImg('');
        }
    }, [setImg]);

    const maxSize = true ? 1000000000000 : 1000000;

    //extract Dropzone content
    const {
        //fileRejections,
        getRootProps,
        getInputProps,
        isDragActive,
        //acceptedFiles
    } = useDropzone({ onDropAccepted, onDropRejected, accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] }, maxSize });

    return (
        <div className="dropzone">
            {/*errorImg !== '' && (
                <span className="error-input">{errorImg}</span>
            )*/}

            {previewImg ? (
                <div className="w-full h-full all-center flex-col">
                    <div className="h-[170px] lg:h-[250px] w-full relative">
                        <Image
                            src={previewImg}
                            fill
                            alt="img-preview"
                            priority
                            className="object-contain"
                        />
                    </div>

                    <button 
                        onClick={() => {
                            setPreviewImg(null);
                            setImg(null);
                        }}
                        className="mt-4 underline"
                    >
                        Cambiar imagen
                    </button>
                </div>
            ) : (
                <div {...getRootProps({ className: 'all-center flex-col h-full w-full text-[rgba(28,9,80,0.5)]' })}>
                    <input {...getInputProps()} />

                    {isDragActive ? (
                        <p>Suelte la imagen para subir</p>
                    ) : (
                        <>
                            <p>Arrastra una imagen o haz click para elegir una</p>

                            <FontAwesomeIcon icon={faImage} className="text-5xl mt-2" />
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
