import { useForm } from "react-hook-form";
import Alert from "../../../components/alert";
import Button from "../../../components/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog";
import ImagemPreview from "../../../components/image-preview";
import InputSingleFile from "../../../components/input-single-file";
import InputText from "../../../components/input-text";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import useAlbums from "../../albums/hooks/use-albums";
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import usePhoto from "../hooks/use-photo.ts";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const { albums, isLoadingAlbums } = useAlbums();
  const { createPhoto } = usePhoto();

  const [modalOpen, setModalOpen] = useState(false);
  const [isCreatingPhoto, setIsCreatingPhoto] = useTransition();

  const form = useForm<PhotoNewFormSchema>({
    resolver: zodResolver(photoNewFormSchema),
  });

  const file = form.watch("file");
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

  useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [modalOpen, form]);

  const handleSubmit = (payload: PhotoNewFormSchema) => {
    setIsCreatingPhoto(async () => createPhoto(payload));

    setModalOpen(false);
  };

  const albumsIds = form.watch("albumsIds");

  const handleToggleAlbum = (albumId: string) => {
    const albumsIds = form.getValues("albumsIds") || [];
    const albumsSet = new Set(albumsIds);

    if (albumsSet.has(albumId)) {
      albumsSet.delete(albumId);
    } else {
      albumsSet.add(albumId);
      console.log("caiu aqui");
    }

    form.setValue("albumsIds", Array.from(albumsSet));
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Adicionar foto</DialogHeader>
          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicionar um título"
              maxLength={255}
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <Alert>
              {" "}
              Tamanho máximo: 50mb
              <br />
              Você pode selecionar arquivo em PNG, JPG ou JPEG
            </Alert>
            <InputSingleFile
              form={form}
              allowedExtensions={["png", "jpg", "jpeg"]}
              maxFileSizeInMB={50}
              error={form.formState.errors.file?.message}
              {...form.register("file")}
              replaceBy={
                <ImagemPreview src={fileSource} className="w-full h-56" />
              }
            />
            <div className="space-y-3">
              <Text variant="label-small"> Selecionar albuns</Text>
              <div className="flex flex-wrap gap-3">
                {!isLoadingAlbums &&
                  albums.length > 0 &&
                  albums.map((album) => (
                    <Button
                      key={album.id}
                      variant={
                        albumsIds?.includes(album.id) ? "primary" : "ghost"
                      }
                      size="sm"
                      className="truncate"
                      onClick={() => handleToggleAlbum(album.id)}
                    >
                      {album.title}
                    </Button>
                  ))}

                {isLoadingAlbums &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={`album-loading-${index}`}
                      className="h-7 w-20"
                    />
                  ))}
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isCreatingPhoto}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              handling={isCreatingPhoto}
              disabled={isCreatingPhoto}
            >
              {isCreatingPhoto ? "Adicionando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
