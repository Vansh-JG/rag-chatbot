import weaviate.classes as wvc

from app.db.weaviate_client import client


def _collection_name(name: str) -> str:
    return name.capitalize()


def get_or_create_collection(name: str):
    col_name = _collection_name(name)
    if not client.collections.exists(col_name):
        client.collections.create(
            name=col_name,
            vectorizer_config=wvc.config.Configure.Vectorizer.none(),
        )
    return client.collections.get(col_name)


def store_embeddings(
    collection_name: str,
    chunks: list[str],
    embeddings: list[list[float]],
    doc_id: str,
):
    collection = get_or_create_collection(collection_name)
    with collection.batch.dynamic() as batch:
        for chunk, embedding in zip(chunks, embeddings):
            batch.add_object(
                properties={"text": chunk, "doc_id": doc_id},
                vector=embedding,
            )


def query_collection(
    collection_name: str,
    query_embedding: list[float],
    top_k: int = 5,
) -> list[tuple[str, float]]:
    collection = get_or_create_collection(collection_name)
    results = collection.query.near_vector(
        near_vector=query_embedding,
        limit=top_k,
        return_properties=["text"],
        return_metadata=wvc.query.MetadataQuery(distance=True),
    )
    return [(obj.properties["text"], obj.metadata.distance) for obj in results.objects]
