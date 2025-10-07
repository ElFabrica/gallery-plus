import Button from "./components/button";
import ButtonIcon from "./components/button-icon";
import ChevronLeftIcon from "./assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "./assets/icons/chevron-right.svg?react";
import Badge from "./components/badge";
import Alert from "./components/alert";
import Divider from "./components/divider";
import InputText from "./components/input-text";
import SearchIcon from "./assets/icons/search.svg?react"
import InputChecbox from "./components/input-checkbox";
import InputSingleFile from "./components/input-single-file";
import { useForm } from "react-hook-form";
import ImagemFilePreview from "./components/image-file-preview";
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader } from "./components/dialog";
import { DialogTrigger } from "./components/dialog";
import Text from "./components/text";
import { DialogClose } from "@radix-ui/react-dialog";

export default function App() {

	const form = useForm()
	const file = form.watch("file");
	const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined
	console.log(fileSource)

	return (
		<div className="grid gap-7 p-6">
			<div className="flex gap-3">
				<Button>Button</Button>
				<Button variant="secondary">Button</Button>
				<Button disabled>Button</Button>
				<Button handling>Loading</Button>
				<Button icon={ChevronRightIcon}>Próxima Imagem</Button>
				<Button variant="ghost" size="sm">
					Button
				</Button>
				<Button variant="primary" size="sm">
					Button
				</Button>
			</div>

			<div className="flex gap-3">
				<ButtonIcon icon={ChevronLeftIcon} />
				<ButtonIcon icon={ChevronRightIcon} variant="secondary" />
			</div>

			<div className="flex gap-3">
				<Badge>Todos</Badge>
				<Badge>Natureza</Badge>
				<Badge>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
			</div>

			<div>
				<Alert>
					Tamanho máximo: 50MB
					<br />
					Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP
				</Alert>
			</div>

			<div>
				<Divider />
			</div>
			<div>
				<InputText placeholder="Buscar foto" icon={SearchIcon} />
			</div>
			<div>
				<InputChecbox />
			</div>
			<div>

			</div>
			<div>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Abrir modal</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader> Teste modal</DialogHeader>
						<DialogBody>
							<Text as="div" className="mb-4">
								Teste conteúdo do body
							</Text>
							<InputSingleFile
								form={form}
								{...form.register("file")}
								allowedExtensions={['png', 'jpg', 'jpeg', 'webp']}
								maxFileSizeInMB={50}
								replaceBy={<ImagemFilePreview src={fileSource} alt="imagem" />}
							/>
						</DialogBody>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="secondary">Cancelar</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button>Adicionar</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
