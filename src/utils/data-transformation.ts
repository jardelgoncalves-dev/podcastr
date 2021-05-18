import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { convertDurationToTimeString } from "./convert-duration-to-time-string";

interface DataTransformationParams {
  fnName: 'episodes'
  data: any
}

export class DataTransformation {
  static transform<T>(params: DataTransformationParams): T | object {
    return this[params.fnName] ? this[params.fnName](params.data) : {}
  }

  static episodes(episode: any) {
    return {
      id: episode.id,
      title: episode.title,
      description: episode.description,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publisedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    }
  }
}