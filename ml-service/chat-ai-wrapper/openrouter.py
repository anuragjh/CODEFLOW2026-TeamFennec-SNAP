from __future__ import annotations

import logging
import time
from typing import Dict, Any

import httpx





MODEL = "openai/gpt-4o-mini"

SYSTEM_PROMPT = "You are a helpful assistant."

USER_PROMPT = "Hello, how are you?"


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)

logger = logging.getLogger("llm.openrouter")



def _short(text: str, max_len: int = 800) -> str:
    if not text:
        return ""

    return text[:max_len] + (
        "..."
        if len(text) > max_len
        else ""
    )



def openrouter_call(
    api_key: str,
    model: str,
    system: str,
    user: str,
    temperature: float = 0.3,
    max_tokens: int = 1024,
) -> Dict[str, Any]:

    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://cineflow.ai",
        "X-Title": "CineFlow",
    }

    body = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": system,
            },
            {
                "role": "user",
                "content": user,
            },
        ],
        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    start = time.perf_counter()

    logger.info(
        "[openrouter] sending request..."
    )

    logger.info(
        "[openrouter] model=%s",
        model,
    )

    try:

        with httpx.Client(timeout=60.0) as client:

            response = client.post(
                url,
                headers=headers,
                json=body,
            )

        elapsed = time.perf_counter() - start

        logger.info(
            "[openrouter] status=%s time=%.2fs",
            response.status_code,
            elapsed,
        )

        response.raise_for_status()

        return response.json()

    except Exception as e:

        elapsed = time.perf_counter() - start

        logger.exception(
            "[openrouter] failed time=%.2fs err=%s",
            elapsed,
            e,
        )

        raise



def extract_text(
    data: Dict[str, Any]
) -> str:

    try:

        message = data["choices"][0]["message"]

        content = message.get(
            "content",
            "",
        )

        if isinstance(content, list):

            text = "".join(
                part.get("text", "")
                for part in content
                if isinstance(part, dict)
            )

        else:

            text = str(content)

        logger.info(
            "[openrouter] response:\n%s",
            _short(text, 1500),
        )

        return text

    except Exception:

        logger.exception(
            "[openrouter] invalid response format"
        )

        return ""



if __name__ == "__main__":

    try:

        response = openrouter_call(
            api_key=API_KEY,
            model=MODEL,
            system=SYSTEM_PROMPT,
            user=USER_PROMPT,
        )

        text = extract_text(response)

        print("\n====================")
        print("LLM RESPONSE")
        print("====================\n")

        print(text)

    except Exception as e:

        print("\nFAILED:\n")

        print(str(e))