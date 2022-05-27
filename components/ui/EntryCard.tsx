import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { useRouter } from "next/router";
import { DragEvent, useContext } from "react";
import { UIContext } from "../../context/ui";
import { Entry, FC } from "../../interfaces"
import { dateFunctions } from '../../utils'

interface Props {
    entry: Entry;
}


export const EntryCard: FC<Props> = ({ entry }) => {
    const router = useRouter()

    const { setIsDragging } = useContext(UIContext)

    const onDragStart = (event: DragEvent<HTMLDivElement>)=>{
        event.dataTransfer.setData('text', entry._id)
        setIsDragging(true)
    }

    const onDragEnd = ()=>{
        setIsDragging(false)
    }

    const onClicked=()=>{
        router.push('/entries/'+entry._id)
    }

  return (
    <Card
        sx={{ marginBottom: 1 }}
        draggable
        onDragStart={ onDragStart }
        onDragEnd={onDragEnd}
        onClick={onClicked}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace: 'pre-line'}} >{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end',  paddingRight: 2}}>
                <Typography variant='body2' >
                    {
                    dateFunctions.getFormatDistanceToNow(entry.createdAt)
                    }
                </Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
